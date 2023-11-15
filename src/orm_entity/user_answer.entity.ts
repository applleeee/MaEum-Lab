import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ChoiceEntity } from './choice.entity';

@Entity()
export class UserAnswerEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false, unsigned: true })
  userId: number;

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
