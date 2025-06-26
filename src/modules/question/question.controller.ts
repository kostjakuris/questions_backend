import { Body, Controller, Delete, Get, Patch, Post, Query, UsePipes } from '@nestjs/common';
// import { CreateTodoDto, DeleteTodoDto, EditTodoDto } from './dto/question.dto';
import { QuestionService } from './question.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { CreateQuestionDto, DeleteQuestionDto, EditQuestionDto, GetQuestionInfoDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {
  }
  
  @Get('/all')
  getAllQuestions() {
    return this.questionService.getAllQuestions();
  }
  
  @Get('/info')
  getQuestionInfo(@Query() getQuestionInfoDto: GetQuestionInfoDto) {
    return this.questionService.getQuestionInfo(getQuestionInfoDto.id);
  }
  
  @Post('/create')
  @UsePipes(ValidationPipe)
  createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto.text, createQuestionDto.questionKind,
      createQuestionDto.answerVariant, createQuestionDto.questionOptions
    );
  }
  
  @Patch('/edit')
  @UsePipes(ValidationPipe)
  editQuestion(@Body() editQuestionDto: EditQuestionDto) {
    return this.questionService.editQuestion(editQuestionDto.id, editQuestionDto.text, editQuestionDto.questionKind,
      editQuestionDto.answerVariant, editQuestionDto.questionOptions, editQuestionDto.answers
    );
  }
  
  @Delete('/delete')
  @UsePipes(ValidationPipe)
  deleteQuestion(@Body() deleteQuestionDto: DeleteQuestionDto) {
    return this.questionService.deleteQuestion(deleteQuestionDto.id);
  }
}
