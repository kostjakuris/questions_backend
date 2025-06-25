import { IsArray, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Options } from '../../../entities/options.entity';
import { AnswerVariants, QuestionKind } from '../../../entities/question.entity';

export class CreateQuestionDto {
  @IsString({message: 'Question text must be a string'})
  @IsNotEmpty({message: 'Question text is required'})
  readonly text: string;
  
  @IsNotEmpty({message: 'Question kind is required'})
  @IsIn(['multiple', 'single'], {
    message: 'Question kind must be one of: multiple, single',
  })
  readonly questionKind: QuestionKind;
  
  @IsNotEmpty({message: 'Answer variant is required'})
  @IsIn(['checkbox', 'radio', 'boolean', 'select', 'textarea'], {
    message: 'Answer variant must be one of: checkbox, radio, boolean, select, textarea',
  })
  readonly answerVariant: AnswerVariants;
  
  @IsArray({message: 'Question options must be an array'})
  readonly questionOptions: Options[];
}

export class EditQuestionDto {
  @IsNumber({}, {message: 'Question id must be a number'})
  @IsNotEmpty({message: 'Question id is required'})
  readonly id: number;
  
  @IsString({message: 'Question text must be a string'})
  @IsNotEmpty({message: 'Question text is required'})
  readonly text: string;
  
  @IsNotEmpty({message: 'Question kind is required'})
  @IsIn(['multiple', 'single'], {
    message: 'Question kind must be one of: multiple, single',
  })
  readonly questionKind: QuestionKind;
  
  @IsNotEmpty({message: 'Answer variant is required'})
  @IsIn(['checkbox', 'radio', 'boolean', 'select', 'textarea'], {
    message: 'Answer variant must be one of: checkbox, radio, boolean, select, textarea',
  })
  readonly answerVariant: AnswerVariants;
  
  @IsArray({message: 'Question options must be an array'})
  readonly questionOptions: Options[];
  
  @IsString({message: 'Answer text must be a string'})
  readonly answer: string;
}

export class GetQuestionInfoDto {
  @IsString({message: 'Question id must be a string'})
  @IsNotEmpty({message: 'Question id is required'})
  readonly id: string;
}
