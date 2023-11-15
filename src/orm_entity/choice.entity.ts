import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { UserAnswerEntity } from './user_answer.entity';

@Entity()
export class ChoiceEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'choice', type: 'varchar', length: 255, nullable: false })
  choice: string;

  @Column({ name: 'score', type: 'int', nullable: false })
  score: number;

  @Column({ name: 'question_id', type: 'int', nullable: false, unsigned: true })
  questionId: number;

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.choiceId)
  userAnswers: UserAnswerEntity[];

  @ManyToOne(() => QuestionEntity, (question) => question.choices, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question: QuestionEntity;
}
