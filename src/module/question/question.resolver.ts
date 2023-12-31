import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionEntity } from 'src/orm_entity/question.entity';
import { QuestionService } from './question.service';

@Resolver(() => QuestionEntity)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => QuestionEntity, {
    description:
      '새 질문을 생성합니다. 질문 내용과 속한 설문지의 id를 넣어주세요.',
  })
  async createQuestion(
    @Args('question', { type: () => String }) question: string,
    @Args('surveyId', { type: () => Number }) surveyId: number,
  ) {
    return await this.questionService.createOne(question, surveyId);
  }

  @Query(() => [QuestionEntity], {
    description:
      'surveyId 또는 questionIds 중 하나만 입력합니다. surveyIds 입력 시 해당하는 설문지들에 대한 모든 질문을 리턴합니다. questionIds 입력 시 id들에 해당하는 질문들의 리스트를 반환합니다. 만약 둘 모두 입력 시 questionIds를 무시합니다.',
  })
  async findQuestions(
    @Args('surveyIds', { type: () => [Number] })
    surveyIds: number[],
    @Args('questionIds', { type: () => [Number] })
    questionIds: number[],
  ) {
    return await this.questionService.find(surveyIds, questionIds);
  }

  @Mutation(() => QuestionEntity, {
    description:
      '질문을 수정합니다. 수정할 질문의 id와 수정 내용을 넣어주세요.',
  })
  async updateQuestion(
    @Args('questionId', { type: () => Number })
    questionId: number,
    @Args('question', { type: () => String })
    question: string,
  ) {
    return await this.questionService.updateOne(questionId, question);
  }

  @Mutation(() => QuestionEntity, {
    description: '삭제할 질문의 id를 넣어주세요.',
  })
  async deleteQuestion(
    @Args('questionId', { type: () => Number })
    questionId: number,
  ) {
    return await this.questionService.deleteOne(questionId);
  }
}
