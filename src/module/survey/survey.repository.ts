import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/orm_entity/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyRepository {
  private readonly logger = new Logger(SurveyRepository.name);

  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
  ) {}

  async createOne(title: string): Promise<SurveyEntity> {
    const survey = new SurveyEntity();
    survey.title = title;
    return this.surveyRepository.save(survey);
  }

  async findAll(): Promise<SurveyEntity[]> {
    return this.surveyRepository.find();
  }

  async updateOne(id: number, title: string): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      const message = 'Cannot find survey with this id in DB';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    survey.title = title;
    return await this.surveyRepository.save(survey);
  }

  async deleteOne(id: number): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.findOne({ where: { id } });
    if (!survey) {
      const message = 'Cannot find survey with this id in DB';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    const result = await this.surveyRepository.delete(id);
    if (result.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return survey;
  }
}
