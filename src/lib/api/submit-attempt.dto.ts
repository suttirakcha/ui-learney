import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AnswerItemDto {
  @IsString({ message: "questionId ต้องเป็นตัวอักษร" })
  questionId: string;

  @IsOptional()
  @IsString()
  selectedChoiceId?: string;

  @IsOptional()
  @IsString()
  textAnswer?: string;
}

export class SubmitTestAttemptDto {
  @IsArray({ message: "answers ต้องเป็น Array" })
  @ValidateNested({ each: true })
  @Type(() => AnswerItemDto)
  answers: AnswerItemDto[];

  @IsOptional()
  learnerSnapshot?: any;
}
