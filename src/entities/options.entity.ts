import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';


@Entity()
export class Options {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  description: string;
  
  @ManyToOne(() => Question, question => question.options)
  question: Question;
}