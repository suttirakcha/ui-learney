"use client";

import { useState } from "react";
import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { AIAssistantPanel } from "@/components/instructor/AIAssistantPanel";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { BasicInfoForm } from "@/components/instructor/course-builder/BasicInfoForm";
import Link from "next/link";

export default function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const steps = [
    { id: 1, title: "ข้อมูลคอร์ส", icon: "BookOpen" },
    { id: 2, title: "เนื้อหาและบทเรียน", icon: "FileText" },
    { id: 3, title: "วิดีโอและสื่อ", icon: "Video" },
    { id: 4, title: "Quiz และแบบฝึกหัด", icon: "Brain" },
    { id: 5, title: "เอกสารเสริม", icon: "Paperclip" },
    { id: 6, title: "ราคาและโปรโมชั่น", icon: "Wallet" },
    { id: 7, title: "หน้าปกและการแสดงผล", icon: "Image" },
    { id: 8, title: "รีวิวก่อนเผยแพร่", icon: "BadgeCheck" },
  ];

  const saveDraft = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    console.log("Draft saved");
  };

  const renderStepContent = (step: number) => {
    if (step === 1) {
      return (
        <BasicInfoForm
          onNext={() => setCurrentStep(2)}
          onBack={() => window.history.back()}
        />
      );
    }

    const stepTitles = [
      "วางโครงสร้างบทเรียน (LessonBuilder - เร็วๆ นี้)",
      "เพิ่มวิดีโอและสื่อ (VideoManager - เร็วๆ นี้)",
      "สร้าง Quiz และแบบฝึกหัด (QuizBuilder - เร็วๆ นี้)",
      "เอกสารเสริม (Resources - เร็วๆ นี้)",
      "ราคาและโปรโมชั่น (PricingForm - เร็วๆ นี้)",
      "หน้าปกและการแสดงผล (Appearance - เร็วๆ นี้)",
      "รีวิวก่อนเผยแพร่ (ReviewPanel - เร็วๆ นี้)",
    ];
    return (
      <div className="p-8 bg-muted/50 rounded-2xl min-h-[400px] flex items-center justify-center text-muted-foreground text-center">
        <div>
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-semibold">⏳</span>
          </div>
          <p className="text-lg font-medium mb-2">{stepTitles[step - 2]}</p>
          <p className="text-sm max-w-md mx-auto">
            กำลังพัฒนาเพิ่มเติม ใช้ขั้นตอนแรกสร้างข้อมูลคอร์สได้เลย
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton />
          <BreadcrumbNav crumbs={[{ label: "สร้างคอร์ส", href: undefined }]} />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse" />
              <h1 className="text-2xl font-bold">Course Builder</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={saveDraft}
                disabled={isSaving}
                variant="outline"
                size="sm"
              >
                {isSaving ? (
                  "กำลังบันทึก..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึกร่าง
                  </>
                )}
              </Button>
              <Link href="/instructor/courses">
                <Button variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  ยกเลิก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 h-[calc(100vh-140px)] overflow-hidden">
        {/* Left Sidebar - Steps */}
        <div className="w-full lg:w-64 xl:w-72 flex-shrink-0 hidden lg:block order-1">
          <div className="h-full bg-card border rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg">ขั้นตอนการสร้าง</h3>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {steps.map((step) => (
                <button
                  key={step.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group
                    ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground border-primary shadow-md font-semibold"
                        : "hover:bg-accent hover:border-accent-foreground border-border"
                    }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                      currentStep === step.id
                        ? "bg-primary scale-125 shadow-sm"
                        : "bg-muted-foreground"
                    }`}
                  ></span>
                  <span className="text-sm">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Steps */}
        <div className="lg:hidden mb-6 pb-4 border-b order-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(step.id)}
                className="flex-shrink-0 whitespace-nowrap"
              >
                {step.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:order-3">
          {renderStepContent(currentStep)}
        </main>

        {/* Right Panel */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0 lg:order-4 hidden lg:flex flex-col gap-6 h-full overflow-hidden">
          <AIAssistantPanel />
          <div className="flex-1 bg-card border rounded-2xl p-6 flex flex-col">
            <h4 className="font-bold mb-4 text-lg">💡 หมายเหตุ</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                ขั้นตอนที่ <strong>{currentStep}</strong>: ตั้งชื่อคอร์สให้ชัดเจน
                เช่น สร้างเว็บด้วย Next.js
              </p>
              <p>คอร์สดี = ชื่อดี + รูปสวย + วิดีโอตัวอย่าง 10 วินาที</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t pt-4">
              <Link href="/instructor/courses">
                <Button variant="outline" size="sm" className="flex-1">
                  ดูคอร์สของฉัน
                </Button>
              </Link>
              <Link href="/instructor/dashboard">
                <Button variant="outline" size="sm" className="flex-1">
                  กลับแดชบอร์ด
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="border-t bg-background/50 backdrop-blur p-4 lg:hidden">
        <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
          <Link href="/instructor/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[100px]"
            >
              แดชบอร์ด
            </Button>
          </Link>
          <Link href="/instructor/courses">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[100px]"
            >
              คอร์ส
            </Button>
          </Link>
          <Link href="/instructor/students">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[100px]"
            >
              นักเรียน
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
