import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerVariants, Question, QuestionKind } from '../../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Options } from '../../entities/options.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(Options) private optionsRepository: Repository<Options>) {
    
  }
  
  async getAllQuestions() {
    const questions = await this.questionRepository.find();
    if (questions) {
      return questions.map((question: Question) => {
        return {id: question.id, text: question.questionText, variant: question.kind};
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
    // console.log(options);
    if (options.length > 0) {
      return await this.questionRepository.save(
        {questionText: text, kind, answerVariant: variant, options});
    }
    return await this.questionRepository.save(
      {questionText: text, kind, answerVariant: variant, options: []});
  }
  
  async editQuestion(id: number, text: string, kind: QuestionKind, variant: AnswerVariants, options: Options[],
    answer: string) {
    return await this.questionRepository.update({id},
      {questionText: text, kind, answerVariant: variant, options, answer}
    );
    
  }
  
  async deleteQuestion(id: number) {
    return await this.questionRepository.delete(id);
  }
}
