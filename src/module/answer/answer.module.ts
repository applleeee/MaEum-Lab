import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswerEntity } from 'src/orm_entity/user_answer.entity';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { AnswerRepository } from './answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswerEntity])],
  providers: [AnswerResolver, AnswerService, AnswerRepository],
})
export class AnswerModule {}
