import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ChoiceEntity } from 'src/orm_entity/choice.entity';
import { ChoiceService } from './choice.service';

@Resolver(() => ChoiceEntity)
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Mutation(() => ChoiceEntity, {
    description:
      'choiceNumber에는 선택지의 번호(1번 문제의 1번 선택지인 경우 1), choice에는 선택지의 내용, score에는 해당 선택지의 점수, questionId에는 선택지가 속한 질문의 id를 넣어주세요.',
  })
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

  @Mutation(() => ChoiceEntity, {
    description: '삭제할 선택지의 id를 넣어주세요.',
  })
  async deleteChoice(
    @Args('choiceId', { type: () => Number })
    choiceId: number,
  ) {
    return await this.choiceService.deleteOne(choiceId);
  }
}
