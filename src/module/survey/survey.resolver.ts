import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SurveyEntity } from 'src/orm_entity/survey.entity';
import { SurveyService } from './survey.service';

@Resolver(() => SurveyEntity)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => String, {
    description: '서버 테스트를 위한 api입니다.',
  })
  test() {
    return 'Test is successful!';
  }

  @Mutation(() => SurveyEntity, {
    description: '새 설문지를 생성합니다. 설문지 제목을 입력해주세요.',
  })
  async createSurvey(@Args('title', { type: () => String }) title: string) {
    return await this.surveyService.createOne(title);
  }

  @Query(() => [SurveyEntity], {
    description:
      'surveyIds에 빈 배열 입력 시 전체 설문을 리턴합니다. 배열 안에 특정 id 입력 시 그에 해당하는 설문을 리턴합니다.',
  })
  async findSurveys(
    @Args('surveyIds', {
      type: () => [Number],
    })
    surveyIds: number[],
  ) {
    return await this.surveyService.find(surveyIds);
  }

  @Mutation(() => SurveyEntity, {
    description:
      '업데이트할 설문지의 id, 바꿀 제목의 내용을 title에 넣어주세요.',
  })
  async updateSurvey(
    @Args('id', { type: () => Number }) id: number,
    @Args('title', { type: () => String }) title: string,
  ) {
    return await this.surveyService.updateOne(id, title);
  }

  @Mutation(() => SurveyEntity, {
    description: '삭제할 설문지의 id를 입력해주세요.',
  })
  async deleteSurvey(@Args('id', { type: () => Number }) id: number) {
    return await this.surveyService.deleteOne(id);
  }

  @Query(() => Number, {
    description: '특정 유저의 한 설문지에 대한 총점을 반환합니다.',
  })
  async totalScore(
    @Args('surveyId', { type: () => Number }) surveyId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.surveyService.getTotalScore(surveyId, userId);
  }
}
