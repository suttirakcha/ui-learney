import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Req,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import {
  PrismaClient,
  CourseTestType,
} from "../database/generated/prisma/client";
import { SubmitTestAttemptDto } from "./dto/submit-attempt.dto";
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { TestEvaluationService } from '../test-evaluation/test-evaluation.service';

@Controller()
export class AssessmentController {
  // สมมติว่า Inject Prisma Service และ TestEvaluationService เข้ามา
  private prisma = new PrismaClient();

  constructor() // private evaluationService: TestEvaluationService
  {}

  // =========================================================
  // 1. GET /courses/:courseId/tests/comparison
  // ต้องวางไว้ด้านบนก่อน GET /courses/:courseId/tests เพื่อป้องกัน Route ชนกัน
  // =========================================================
  @Get("courses/:courseId/tests/comparison")
  // @UseGuards(JwtAuthGuard)
  async getComparison(@Param("courseId") courseId: string, @Req() req: any) {
    const userId = req.user?.id || "mock-user-id"; // ใช้ User ID จริงจาก Auth

    // หา Pre-test และ Post-test ของคอร์สนี้
    const preTest = await this.prisma.courseTest.findUnique({
      where: { courseId_type: { courseId, type: "PRE_TEST" } },
    });
    const postTest = await this.prisma.courseTest.findUnique({
      where: { courseId_type: { courseId, type: "POST_TEST" } },
    });

    if (!preTest || !postTest) {
      throw new NotFoundException(
        "ไม่พบข้อมูลแบบทดสอบสำหรับเปรียบเทียบในคอร์สนี้",
      );
    }

    // ดึงผลลัพธ์ล่าสุดที่ประเมินแล้วของผู้เรียน
    const preAttempt = await this.prisma.testAttempt.findFirst({
      where: { testId: preTest.id, userId, status: "EVALUATED" },
      orderBy: { submittedAt: "desc" },
      include: { evaluation: true },
    });

    const postAttempt = await this.prisma.testAttempt.findFirst({
      where: { testId: postTest.id, userId, status: "EVALUATED" },
      orderBy: { submittedAt: "desc" },
      include: { evaluation: true },
    });

    if (!preAttempt || !postAttempt) {
      throw new BadRequestException(
        "ผู้เรียนต้องทำทั้ง Pre-test และ Post-test ถึงจะดูผลเปรียบเทียบได้",
      );
    }

    // แปลงข้อมูลให้อยู่ใน Format สำหรับ Recharts (Radar Chart)
    const preScores =
      (preAttempt.evaluation?.dimensionScores as Record<
        string,
        { score: number; maxScore: number }
      >) || {};
    const postScores =
      (postAttempt.evaluation?.dimensionScores as Record<
        string,
        { score: number; maxScore: number }
      >) || {};

    // รวม Dimensions ทั้งหมดที่มี
    const allDimensions = Array.from(
      new Set([...Object.keys(preScores), ...Object.keys(postScores)]),
    );

    const dimensions = allDimensions.map((subject) => ({
      subject,
      preScore: preScores[subject]?.score || 0,
      postScore: postScores[subject]?.score || 0,
      fullMark: Math.max(
        preScores[subject]?.maxScore || 0,
        postScores[subject]?.maxScore || 10,
      ),
    }));

    return {
      preTestScore: preAttempt.totalScore,
      postTestScore: postAttempt.totalScore,
      maxScore: preAttempt.maxScore,
      dimensions,
    };
  }

  // =========================================================
  // 2. GET /courses/:courseId/tests
  // =========================================================
  @Get("courses/:courseId/tests")
  async getCourseTest(
    @Param("courseId") courseId: string,
    @Query("type") type: CourseTestType,
  ) {
    const test = await this.prisma.courseTest.findUnique({
      where: { courseId_type: { courseId, type } },
      include: {
        sections: {
          orderBy: { order: "asc" },
          include: {
            questions: {
              orderBy: { order: "asc" },
              include: {
                choices: {
                  // ⚠️ สำคัญมาก: ไม่ดึง isCorrect และ explanation เพื่อป้องกัน Frontend แอบดูเฉลย
                  select: { id: true, text: true, order: true },
                  orderBy: { order: "asc" },
                },
              },
            },
          },
        },
      },
    });

    if (!test || test.status !== "ACTIVE") {
      throw new NotFoundException(
        "ไม่พบแบบประเมิน หรือแบบประเมินยังไม่เปิดใช้งาน",
      );
    }

    // แปลงโครงสร้างจาก sections เป็น Array ของ questions ก้อนเดียว ให้ Frontend ใช้ง่าย
    const flatQuestions = test.sections.flatMap((section) =>
      section.questions.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        type: q.type,
        sectionTitle: section.title,
        choices: q.choices,
      })),
    );

    return {
      id: test.id,
      title: test.title,
      description: test.description,
      timeLimit: test.timeLimit,
      questions: flatQuestions,
    };
  }

  // =========================================================
  // 3. POST /tests/:testId/attempts
  // =========================================================
  @Post("tests/:testId/attempts")
  // @UseGuards(JwtAuthGuard)
  async startAttempt(@Param("testId") testId: string, @Req() req: any) {
    const userId = req.user?.id || "mock-user-id"; // ใช้ User ID จริง

    // สร้าง Attempt ใหม่สถานะ IN_PROGRESS
    const attempt = await this.prisma.testAttempt.create({
      data: {
        testId,
        userId,
        status: "IN_PROGRESS",
      },
    });

    return attempt;
  }

  // =========================================================
  // 4. POST /attempts/:attemptId/submit
  // =========================================================
  @Post("attempts/:attemptId/submit")
  // @UseGuards(JwtAuthGuard)
  async submitAttempt(
    @Param("attemptId") attemptId: string,
    @Body() body: SubmitTestAttemptDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id || "mock-user-id";

    // 1. บันทึกคำตอบลงฐานข้อมูลทั้งหมด
    for (const ans of body.answers) {
      await this.prisma.testAnswer.create({
        data: { attemptId, ...ans },
      });
    }

    // 2. เรียกใช้ Service ตรวจข้อสอบ และให้ AI ประเมินผล (จากโค้ดที่คุณเคยสร้างไว้)
    // return this.evaluationService.submitAndEvaluateAttempt(attemptId);

    return { status: "EVALUATED", id: attemptId }; // ชั่วคราวกรณีถ้ายังไม่ลิงก์ Service
  }
}
