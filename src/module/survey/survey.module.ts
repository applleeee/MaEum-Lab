import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/orm_entity/survey.entity';
import { SurveyService } from './survey.service';
import { SurveyRepository } from './survey.repository';
import { SurveyResolver } from './survey.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  providers: [SurveyService, SurveyRepository, SurveyResolver],
})
export class SurveyModule {}
