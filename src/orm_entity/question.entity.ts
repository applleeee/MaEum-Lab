import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SurveyEntity } from './survey.entity';
import { ChoiceEntity } from './choice.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('question')
export class QuestionEntity {
  @Field(() => Int, { nullable: false, description: '질문 고유 id' })
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Field(() => String, { nullable: false, description: '질문 내용' })
  @Column({ name: 'question', type: 'varchar', length: 255, nullable: false })
  question: string;

  @Field(() => Int, { nullable: false, description: '연관된 설문지 id' })
  @Column({ name: 'survey_id', type: 'int', nullable: false, unsigned: true })
  surveyId: number;

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'survey_id', referencedColumnName: 'id' }])
  survey: SurveyEntity;

  @OneToMany(() => ChoiceEntity, (choice) => choice.question)
  choices: ChoiceEntity[];
}
