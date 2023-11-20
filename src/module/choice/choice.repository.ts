import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';
import { DeleteResult, In, Repository } from 'typeorm';

@Injectable()
export class ChoiceRepository {
  private readonly logger = new Logger(ChoiceRepository.name);

  constructor(
    @InjectRepository(ChoiceEntity)
    private readonly choiceRepository: Repository<ChoiceEntity>,
  ) {}

  async createOne(
    choiceNumber: number,
    choice: string,
    score: number,
    questionId: number,
  ): Promise<ChoiceEntity> {
    const choiceEntity = new ChoiceEntity();

    choiceEntity.choice = choice;
    choiceEntity.choiceNumber = choiceNumber;
    choiceEntity.score = score;
    choiceEntity.questionId = questionId;

    return await this.choiceRepository.save(choiceEntity);
  }

  async isExist(questionId: number, choiceNumber: number): Promise<boolean> {
    return await this.choiceRepository.exist({
      where: { questionId, choiceNumber },
    });
  }

  async find(questionIds: number[]): Promise<ChoiceEntity[]> {
    return await this.choiceRepository.find({
      where: {
        questionId: In(questionIds),
      },
      order: {
        questionId: 'ASC',
        choiceNumber: 'ASC',
      },
    });
  }

  async findWithId(choiceId: number): Promise<ChoiceEntity> {
    const result = await this.choiceRepository.findOne({
      where: { id: choiceId },
    });

    if (!result) {
      const message = 'Cannot find choice with this choiceId in DB';
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    return result;
  }

  async updateOne(choiceEntity: ChoiceEntity): Promise<ChoiceEntity> {
    return await this.choiceRepository.save(choiceEntity);
  }

  async deleteOne(choideId: number): Promise<DeleteResult> {
    return await this.choiceRepository.delete(choideId);
  }
}
