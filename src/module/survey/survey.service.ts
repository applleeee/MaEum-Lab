import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { SurveyEntity } from 'src/orm_entity/survey.entity';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(private readonly surveyRepository: SurveyRepository) {}

  async createOne(title: string): Promise<SurveyEntity> {
    try {
      const result = await this.surveyRepository.createOne(title);
      this.logger.log('Survey successfully created');
      return result;
    } catch (error) {
      const message = 'Cannot create new survey in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(surveyIds: number[]): Promise<SurveyEntity[]> {
    if (surveyIds.length === 0) {
      return await this.surveyRepository.findAll();
    }
    if (surveyIds.length > 0) {
      return await this.surveyRepository.find(surveyIds);
    }
  }

  async updateOne(id: number, title: string): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.find([id]);

    survey[0].title = title;
    try {
      const updateResult = await this.surveyRepository.updateOne(survey[0]);
      this.logger.log('Survey successfully updated');
      return updateResult;
    } catch (error) {
      const message = 'Cannot save updated survey in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(id: number): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.find([id]);

    const deleteResult = await this.surveyRepository.deleteOne(id);
    if (deleteResult.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log('Survey successfully deleted');
    return survey[0];
  }
}
