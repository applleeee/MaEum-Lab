import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { UserAnswerEntity } from 'src/orm_entity/user_answer.entity';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);

  constructor(private readonly answerRepository: AnswerRepository) {}

  async createOne(choiceId: number, userId: number): Promise<UserAnswerEntity> {
    // 해당 문제에 대해 이미 답을 한 경우 에러(선택지 중복 체크 불가)
    const check = await this.answerRepository.isAnswered(choiceId, userId);
    if (check.length > 0) {
      const message = 'This user already answer to this question';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    try {
      const result = await this.answerRepository.createOne(choiceId, userId);
      this.logger.log('User answer successfully created');
      return result;
    } catch (error) {
      const message = 'Cannot create new answer in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(questionId: number, userId: number) {
    try {
      return await this.answerRepository.findOne(questionId, userId);
    } catch (error) {
      const message = 'Cannot find user answer in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateOne(answerId: number, userId: number, choiceId: number) {
    // 기존 데이터 조회, 기존 데이터 삭제, 새 데이터 생성
    await this.deleteOne(answerId);
    return await this.createOne(choiceId, userId);
  }

  async deleteOne(answerId: number) {
    const answerEntity = await this.answerRepository.findWithId(answerId);

    if (!answerEntity) {
      const message = 'Cannot find answer with this id in DB';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    const deleteResult = await this.answerRepository.deleteOne(answerId);
    if (deleteResult.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log('Answer successfully deleted');
    return answerEntity;
  }
}
