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

@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'question', type: 'varchar', length: 255, nullable: false })
  question: string;

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
