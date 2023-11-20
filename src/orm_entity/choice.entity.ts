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
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('choice')
export class ChoiceEntity {
  @Field(() => Int, { nullable: false, description: '선택지 고유 id' })
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Field(() => String, { nullable: false, description: '선택 문항 내용' })
  @Column({ name: 'choice', type: 'varchar', length: 255, nullable: false })
  choice: string;

  @Field(() => Int, {
    nullable: false,
    description: '선택지 번호(1번, 2번, 3번...',
  })
  @Column({
    name: 'choice_number',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  choiceNumber: number;

  @Field(() => Int, { nullable: false, description: '답변 당 점수' })
  @Column({ name: 'score', type: 'int', nullable: false })
  score: number;

  @Field(() => Int, { nullable: false, description: '연결된 질문 id' })
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
