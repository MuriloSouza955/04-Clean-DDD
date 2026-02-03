import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { left, right, type Either } from '@/core/either'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Question } from '../../../entities/question'

interface ChooseQuestionBestAnswerCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

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
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = new UniqueEntityId(answer.id.toString())

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
