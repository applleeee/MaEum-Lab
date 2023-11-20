import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/orm_entity/question.entity';
import { Repository, In, DeleteResult } from 'typeorm';

@Injectable()
export class QuestionRepository {
  private readonly logger = new Logger(QuestionRepository.name);

  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRespository: Repository<QuestionEntity>,
  ) {}

  async createOne(question: string, surveyId: number): Promise<QuestionEntity> {
    const questionEntity = new QuestionEntity();
    questionEntity.question = question;
    questionEntity.surveyId = surveyId;

    return this.questionRespository.save(questionEntity);
  }

  async findQuestionsWithSurveyIds(
    surveyIds: number[],
  ): Promise<QuestionEntity[]> {
    return await this.questionRespository.find({
      where: {
        surveyId: In(surveyIds),
      },
    });
  }

  async findQuestionWithIds(questionIds: number[]): Promise<QuestionEntity[]> {
    const result = await this.questionRespository.find({
      where: {
        id: In(questionIds),
      },
    });

    if (result.length === 0) {
      const message = 'Cannot find question with this id in DB';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    return result;
  }

  async updateOne(questionEntity: QuestionEntity): Promise<QuestionEntity> {
    return await this.questionRespository.save(questionEntity);
  }

  async deleteOne(questionId: number): Promise<DeleteResult> {
    return await this.questionRespository.delete(questionId);
  }
}
