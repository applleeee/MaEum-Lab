import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity()
export class SurveyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 50, nullable: false })
  title: string;

  @OneToMany(() => QuestionEntity, (question) => question.surveyId)
  questions: QuestionEntity[];
}
