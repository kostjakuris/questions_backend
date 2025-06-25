import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Options } from './options.entity';

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
  
  @Column({nullable: true})
  answer: string;
  
  @OneToMany(() => Options, options => options.question, {eager: true, onDelete: 'CASCADE'})
  options: Options[];
}