import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { QuestionEntity } from 'src/orm_entity/question.entity';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(private readonly questionRepository: QuestionRepository) {}

  async createOne(question: string, surveyId: number): Promise<QuestionEntity> {
    try {
      const result = await this.questionRepository.createOne(
        question,
        surveyId,
      );
      this.logger.log('Question successfully created');

      return result;
    } catch (error) {
      const message = 'Cannot save new question in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async find(
    surveyIds: number[],
    questionIds: number[],
  ): Promise<QuestionEntity[]> {
    let result: QuestionEntity[];

    if (surveyIds.length > 0) {
      result = await this.questionRepository.findQuestionsWithSurveyIds(
        surveyIds,
      );
    }

    if (surveyIds.length === 0 && questionIds.length > 0) {
      result = await this.questionRepository.findQuestionWithIds(questionIds);
    }

    if (result.length === 0) {
      const message = 'Cannot find question with this id in DB';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async updateOne(
    questionId: number,
    question: string,
  ): Promise<QuestionEntity> {
    const questionList = await this.questionRepository.findQuestionWithIds([
      questionId,
    ]);

    questionList[0].question = question;

    try {
      const updateResult = await this.questionRepository.updateOne(
        questionList[0],
      );
      this.logger.log('Question successfully updated');
      return updateResult;
    } catch (error) {
      const message = 'Cannot save updated question in DB';
      this.logger.error(message, error.stack);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(questionId: number) {
    const question = await this.questionRepository.findQuestionWithIds([
      questionId,
    ]);

    const deleteResult = await this.questionRepository.deleteOne(questionId);

    if (deleteResult.affected !== 1) {
      const message = 'There was a problem with the deletion';
      this.logger.error(message);
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.logger.log('Question successfully deleted');
    return question[0];
  }
}
