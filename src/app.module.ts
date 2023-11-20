import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { SurveyModule } from './module/survey/survey.module';
import { SurveyEntity } from './orm_entity/survey.entity';
import { ChoiceEntity } from './orm_entity/choice.entity';
import { QuestionEntity } from './orm_entity/question.entity';
import { UserEntity } from './orm_entity/user.entity';
import { UserAnswerEntity } from './orm_entity/user_answer.entity';
import { QuestionModule } from './module/question/question.module';
import { ChoiceModule } from './module/choice/choice.module';
config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      formatError: (error) => ({
        message: error.message,
        path: error.path,
        code: error.extensions.code,
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        SurveyEntity,
        ChoiceEntity,
        QuestionEntity,
        UserEntity,
        UserAnswerEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    SurveyModule,
    QuestionModule,
    ChoiceModule,
  ],
})
export class AppModule {}
