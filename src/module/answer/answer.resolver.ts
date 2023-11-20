import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAnswerEntity } from 'src/orm_entity/user_answer.entity';
import { AnswerService } from './answer.service';

@Resolver(() => UserAnswerEntity)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => UserAnswerEntity)
  async createAnswer(
    @Args('choiceId', { type: () => Number }) choiceId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.answerService.createOne(choiceId, userId);
  }

  @Query(() => UserAnswerEntity)
  async findAnswer(
    @Args('questionId', { type: () => Number }) questionId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.answerService.findOne(questionId, userId);
  }

  @Mutation(() => UserAnswerEntity)
  async updateAnswer(
    @Args('answerId', { type: () => Number }) answerId: number,
    @Args('userId', { type: () => Number }) userId: number,
    @Args('choiceId', { type: () => Number }) choiceId: number,
  ) {
    return await this.answerService.updateOne(answerId, userId, choiceId);
  }

  @Mutation(() => UserAnswerEntity)
  async deleteAnswer(
    @Args('answerId', { type: () => Number }) answerId: number,
  ) {
    return await this.answerService.deleteOne(answerId);
  }
}
