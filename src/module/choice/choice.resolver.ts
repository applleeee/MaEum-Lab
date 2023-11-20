import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';
import { ChoiceService } from './choice.service';

@Resolver(() => ChoiceEntity)
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => ChoiceEntity)
  async createChoice(
    @Args('choiceNumber', {
      type: () => Number,
    })
    choiceNumber: number,
    @Args('choice', {
      type: () => String,
    })
    choice: string,
    @Args('score', {
      type: () => Number,
    })
    score: number,
    @Args('questionId', {
      type: () => Number,
    })
    questionId: number,
  ) {
    return await this.choiceService.createOne(
      choiceNumber,
      choice,
      score,
      questionId,
    );
  }

  @Query(() => [ChoiceEntity], {
    description: '질문 id 배열로 입력 시 그에 포함되는 선택지들 모두 리턴',
  })
  async findChoices(
    @Args('questionIds', {
      type: () => [Number],
    })
    questionIds: number[],
  ) {
    return await this.choiceService.find(questionIds);
  }

  @Mutation(() => ChoiceEntity, {
    description: '업데이트할 choiceId 입력, 나머지는 수정할 내용 입력',
  })
  async updateChoice(
    @Args('choiceId', { type: () => Number })
    choiceId: number,
    @Args('choice', { type: () => String })
    choice: string,
    @Args('score', { type: () => Number })
    score: number,
    @Args('choiceNumber', { type: () => Number })
    choiceNumber: number,
  ) {
    return await this.choiceService.updateOne(
      choiceId,
      choice,
      score,
      choiceNumber,
    );
  }

  @Mutation(() => ChoiceEntity)
  async deleteChoice(
    @Args('choiceId', { type: () => Number })
    choiceId: number,
  ) {
    return await this.choiceService.deleteOne(choiceId);
  }
}
