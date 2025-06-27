import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerVariants, Question, QuestionKind } from '../../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Options } from '../../entities/options.entity';
import { Answer } from '../../entities/answer.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(Options) private optionsRepository: Repository<Options>,
    @InjectRepository(Answer) private answerRepository: Repository<Answer>) {
    
  }
  
  async getAllQuestions() {
    const questions = await this.questionRepository.find();
    if (questions) {
      return questions.map((question: Question) => {
        return {
          id: question.id,
          text: question.questionText,
          variant: question.kind,
          answerVariant: question.answerVariant
        };
      });
    }
    return [];
  }
  
  async getQuestionInfo(id: string) {
    const question = await this.questionRepository.findOne({where: {id: Number(id)}});
    if (question) {
      return question;
    }
    throw new NotFoundException('Question not found');
  }
  
  async createQuestion(text: string, kind: QuestionKind, variant: AnswerVariants, options: Options[]) {
    if (options.length > 0) {
      return await this.questionRepository.save(
        {questionText: text, kind, answerVariant: variant, options});
    }
    return await this.questionRepository.save(
      {questionText: text, kind, answerVariant: variant});
  }
  
  async editQuestion(id: number, text: string, kind: QuestionKind, variant: AnswerVariants, options: Options[],
    answers: Answer[]) {
    const question = await this.questionRepository.findOne({where: {id}});
    if (question) {
      if (kind === 'single' || kind === 'multiple' && variant === 'boolean') {
        for (const option of question.options) {
          await this.optionsRepository.delete(option.id);
        }
        for (const answer of question.answers) {
          await this.answerRepository.delete(answer.id);
        }
        await this.questionRepository.update({id: question.id}, {questionText: text, kind, answerVariant: variant});
      } else {
        Object.assign(question, {questionText: text, kind, answerVariant: variant, options, answers});
        await this.questionRepository.save(question);
      }
    }
  }
  
  async deleteQuestion(id: number) {
    return await this.questionRepository.delete(id);
  }
}
