import { Module } from '@nestjs/common';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/orm_entity/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  providers: [SurveyResolver],
})
export class SurveyModule {}
