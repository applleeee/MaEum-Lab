import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/orm_entity/question.entity';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionResolver, QuestionService, QuestionRepository],
})
export class QuestionModule {}
