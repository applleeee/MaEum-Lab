import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { SurveyEntity } from 'src/orm_entity/survey.entity';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(private readonly SurveyRepository: SurveyRepository) {}

  async createOne(title: string): Promise<SurveyEntity> {
    try {
      const result = await this.SurveyRepository.createOne(title);
      this.logger.log('Survey successfully created');
      return result;
    } catch (error) {
      const message = 'Cannot create new survey in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(
        { error: message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<SurveyEntity[]> {
    try {
      return await this.SurveyRepository.findAll();
    } catch (error) {
      const message = 'Cannot find survey in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOne(id: number, title: string): Promise<SurveyEntity> {
    const survey = await this.SurveyRepository.findOne(id);

    survey.title = title;
    try {
      const updateResult = await this.SurveyRepository.updateOne(survey);
      this.logger.log('Survey successfully updated');
      return updateResult;
    } catch (error) {
      const message = 'Cannot save updated survey in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(id: number): Promise<SurveyEntity> {
    const survey = await this.SurveyRepository.findOne(id);

    const deleteResult = await this.SurveyRepository.deleteOne(id);
    if (deleteResult.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log('Survey successfully deleted');
    return survey;
  }
}
