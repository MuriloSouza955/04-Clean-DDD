import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { QuestionsRepository } from '../repositories/question-repository'
import type { Question } from '../../enterprise/entities/question'

interface ChooseQuestionBestAnswerCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerCaseRequest): Promise<ChooseQuestionBestAnswerCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed to choose the best answer')
    }

    question.bestAnswerId = new UniqueEntityId(answer.id.toString())

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
