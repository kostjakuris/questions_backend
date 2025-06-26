import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';


@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  text: string;
  
  @ManyToOne(() => Question, question => question.answers, {onDelete: 'CASCADE'})
  question: Question;
}