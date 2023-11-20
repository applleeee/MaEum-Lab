import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ChoiceEntity } from './choice.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('user_answer')
export class UserAnswerEntity {
  @Field(() => Int, { nullable: false, description: '유저 정답 고유 id' })
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Field(() => Int, { nullable: false, description: '유저 id' })
  @Column({ name: 'user_id', type: 'int', nullable: false, unsigned: true })
  userId: number;

  @Field(() => Int, { nullable: false, description: '선택한 선택지 id' })
  @Column({ name: 'choice_id', type: 'int', nullable: false, unsigned: true })
  choiceId: number;

  @ManyToOne(() => UserEntity, (user) => user.userAnswers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @ManyToOne(() => ChoiceEntity, (choice) => choice.userAnswers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'choice_id', referencedColumnName: 'id' }])
  choice: ChoiceEntity;
}
