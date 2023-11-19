import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/orm_entity/survey.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class SurveyRepository {
  private readonly logger = new Logger(SurveyRepository.name);

  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
  ) {}

  async findOne(id: number): Promise<SurveyEntity> {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      const message = 'Cannot find survey with this id in DB';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return survey;
  }

  async createOne(title: string): Promise<SurveyEntity> {
    const survey = new SurveyEntity();
    survey.title = title;
    return this.surveyRepository.save(survey);
  }

  async findAll(): Promise<SurveyEntity[]> {
    return this.surveyRepository.find();
  }

  async updateOne(survey: SurveyEntity): Promise<SurveyEntity> {
    return await this.surveyRepository.save(survey);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.surveyRepository.delete(id);
  }
}
