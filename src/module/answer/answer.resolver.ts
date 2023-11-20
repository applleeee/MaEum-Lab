import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAnswerEntity } from 'src/orm_entity/user_answer.entity';
import { AnswerService } from './answer.service';

@Resolver(() => UserAnswerEntity)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => UserAnswerEntity, {
    description:
      '선택할 선택지 id와 유저의 id 입력. 같은 문제 내에서 중복 선택 시 에러',
  })
  async createAnswer(
    @Args('choiceId', { type: () => Number }) choiceId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.answerService.createOne(choiceId, userId);
  }

  @Query(() => UserAnswerEntity, {
    description: '조회할 문제와 유저의 id 입력 시 해당 유저의 답변 리턴',
  })
  async findAnswer(
    @Args('questionId', { type: () => Number }) questionId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.answerService.findOne(questionId, userId);
  }

  @Mutation(() => UserAnswerEntity, {
    description:
      '수정할 답변의 id. 해당 답변 삭제 후 입력한 userId, choiceId로 새 답변 생성',
  })
  async updateAnswer(
    @Args('answerId', { type: () => Number }) answerId: number,
    @Args('userId', { type: () => Number }) userId: number,
    @Args('choiceId', { type: () => Number }) choiceId: number,
  ) {
    return await this.answerService.updateOne(answerId, userId, choiceId);
  }

  @Mutation(() => UserAnswerEntity, { description: '삭제할 답변의 id 입력' })
  async deleteAnswer(
    @Args('answerId', { type: () => Number }) answerId: number,
  ) {
    return await this.answerService.deleteOne(answerId);
  }
}
