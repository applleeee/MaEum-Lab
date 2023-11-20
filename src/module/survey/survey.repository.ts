import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
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

  async createOne(title: string): Promise<SurveyEntity> {
    const survey = new SurveyEntity();
    survey.title = title;
    return await this.surveyRepository.save(survey);
  }

  async findAll(): Promise<SurveyEntity[]> {
    return this.surveyRepository.find();
  }

  async find(surveyIds: number[]): Promise<SurveyEntity[]> {
    const surveys = await this.surveyRepository
      .createQueryBuilder()
      .where('id IN (:...surveyIds)', { surveyIds })
      .getMany();

    if (surveys.length === 0) {
      const message = 'Cannot find survey with this id in DB';
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    if (surveyIds.length !== surveys.length) {
      const message = 'There is wrong id in list';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    return surveys;
  }

  async updateOne(survey: SurveyEntity): Promise<SurveyEntity> {
    return await this.surveyRepository.save(survey);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.surveyRepository.delete(id);
  }
}
