import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Options } from './options.entity';
import { Answer } from './answer.entity';

export type QuestionKind = 'multiple' | 'single';
export type AnswerVariants = 'checkbox' | 'radio' | 'boolean' | 'select' | 'textarea';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  questionText: string;
  
  @Column()
  kind: QuestionKind;
  
  @Column()
  answerVariant: AnswerVariants;
  
  @OneToMany(() => Answer, answer => answer.question, {eager: true, cascade: true})
  answers: Answer[];
  
  @OneToMany(() => Options, options => options.question, {eager: true, cascade: true})
  options: Options[];
}