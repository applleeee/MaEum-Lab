import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('survey')
export class SurveyEntity {
  @Field(() => Int, { nullable: false, description: '설문지 고유 id' })
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Field(() => String, { nullable: false, description: '설문지 제목' })
  @Column({ name: 'title', type: 'varchar', length: 50, nullable: false })
  title: string;

  @OneToMany(() => QuestionEntity, (question) => question.surveyId)
  questions: QuestionEntity[];
}
