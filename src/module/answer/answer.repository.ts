import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';
import { UserAnswerEntity } from 'src/orm_entity/user_answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(UserAnswerEntity)
    private readonly userAnswerRepository: Repository<UserAnswerEntity>,
  ) {}

  async isAnswered(
    choiceId: number,
    userId: number,
  ): Promise<Promise<UserAnswerEntity[]>> {
    return await this.userAnswerRepository
      .createQueryBuilder('userAnswer')
      .select(['userAnswer.id', 'userAnswer.choiceId', 'userAnswer.userId'])
      .leftJoin('choice', 'choice', 'choice.id = userAnswer.choiceId')
      .where((subQuery) => {
        const subQueryAlias = subQuery
          .subQuery()
          .select('choice.question_id')
          .from(ChoiceEntity, 'choice')
          .where('choice.id = :choiceId', { choiceId })
          .getQuery();
        return `choice.questionId IN ${subQueryAlias}`;
      })
      .andWhere('userAnswer.userId = :userId', { userId })
      .getMany();
  }

  async createOne(choiceId: number, userId: number): Promise<UserAnswerEntity> {
    const userAnswerEntity = new UserAnswerEntity();

    userAnswerEntity.choiceId = choiceId;
    userAnswerEntity.userId = userId;

    return await this.userAnswerRepository.save(userAnswerEntity);
  }

  async findOne(questionId: number, userId: number) {
    return await this.userAnswerRepository
      .createQueryBuilder('userAnswer')
      .select()
      .leftJoin('choice', 'choice', 'choice.id = userAnswer.choiceId')
      .leftJoin('question', 'question', 'question.id = choice.questionId')
      .where('question.id = :questionId', { questionId })
      .andWhere('userAnswer.userId = :userId', { userId })
      .getOne();
  }

  async findWithId(answerId: number) {
    return await this.userAnswerRepository.findOne({ where: { id: answerId } });
  }

  async deleteOne(answerId: number) {
    return await this.userAnswerRepository.delete(answerId);
  }
}
