import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAnswerEntity } from './user_answer.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 10, nullable: false })
  name: string;

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.userId)
  userAnswers: UserAnswerEntity[];
}
