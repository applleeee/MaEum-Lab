import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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

  @Query(() => [SurveyEntity])
  async findAllSurveys() {
    return await this.surveyService.findAll();
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
}
