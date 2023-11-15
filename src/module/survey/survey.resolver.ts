import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class SurveyResolver {
  @Query(() => String)
  test() {
    return 'Test is successful!';
  }
}
