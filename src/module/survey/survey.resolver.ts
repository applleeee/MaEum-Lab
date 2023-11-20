import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { SurveyEntity } from 'src/orm_entity/survey.entity';
import { SurveyService } from './survey.service';

@Resolver(() => SurveyEntity)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => String)
  test() {
    return 'Test is successful!';
  }

  @Mutation(() => SurveyEntity)
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

  @Mutation(() => SurveyEntity)
  async updateSurvey(
    @Args('id', { type: () => Number }) id: number,
    @Args('title', { type: () => String }) title: string,
  ) {
    return await this.surveyService.updateOne(id, title);
  }

  @Mutation(() => SurveyEntity)
  async deleteSurvey(@Args('id', { type: () => Number }) id: number) {
    return await this.surveyService.deleteOne(id);
  }

  @Query(() => Number)
  async totalScore(
    @Args('surveyId', { type: () => Number }) surveyId: number,
    @Args('userId', { type: () => Number }) userId: number,
  ) {
    return await this.surveyService.getTotalScore(surveyId, userId);
  }
}
