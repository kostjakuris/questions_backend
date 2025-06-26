import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from '../../entities/question.entity';
import { Options } from '../../entities/options.entity';
import { Answer } from '../../entities/answer.entity';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  imports: [TypeOrmModule.forFeature([Question, Options, Answer])],
  exports: [
    QuestionService
  ],
})
export class QuestionModule {
}
