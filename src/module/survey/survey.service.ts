import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SurveyRepository } from './survey.repository';
import { SurveyEntity } from 'src/orm_entity/survey.entity';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(private readonly SurveyRepository: SurveyRepository) {}

  async createOne(title: string): Promise<SurveyEntity> {
    try {
      return await this.SurveyRepository.createOne(title);
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
    return await this.SurveyRepository.updateOne(id, title);
  }

  async deleteOne(id: number): Promise<SurveyEntity> {
    return await this.SurveyRepository.deleteOne(id);
  }
}
