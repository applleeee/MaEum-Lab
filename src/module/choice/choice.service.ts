import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ChoiceRepository } from './choice.repository';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';

@Injectable()
export class ChoiceService {
  private readonly logger = new Logger(ChoiceService.name);

  constructor(private readonly choiceRepository: ChoiceRepository) {}

  async createOne(
    choiceNumber: number,
    choice: string,
    score: number,
    questionId: number,
  ): Promise<ChoiceEntity> {
    // 같은 문제에 같은 번호를 가진 선택지가 존재하는지 확인
    const checkDuplication = await this.choiceRepository.isExist(
      questionId,
      choiceNumber,
    );

    if (checkDuplication === true) {
      const message = `There is already a choice with the number ${choiceNumber} for this question`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    try {
      const result = await this.choiceRepository.createOne(
        choiceNumber,
        choice,
        score,
        questionId,
      );

      this.logger.log('Choice successfully created');
      return result;
    } catch (error) {
      const message = 'Cannot create new choice in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(questionIds: number[]): Promise<ChoiceEntity[]> {
    const result = await this.choiceRepository.find(questionIds);

    if (result.length === 0) {
      const message = 'There is no choice with this questionId';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    return result;
  }

  async updateOne(
    choiceId: number,
    choice: string,
    score: number,
    choiceNumber: number,
  ): Promise<ChoiceEntity> {
    const choiceEntity = await this.choiceRepository.findWithId(choiceId);

    choiceEntity.choice = choice;
    choiceEntity.score = score;
    choiceEntity.choiceNumber = choiceNumber;

    try {
      const updatedResult = await this.choiceRepository.updateOne(choiceEntity);
      this.logger.log('Choice successfully updated');
      return updatedResult;
    } catch (error) {
      const message = 'Cannot save updated choice in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(choiceId: number): Promise<ChoiceEntity> {
    const choice = await this.choiceRepository.findWithId(choiceId);

    const deleteResult = await this.choiceRepository.deleteOne(choiceId);

    if (deleteResult.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log('Choice successfully deleted');
    return choice;
  }
}
