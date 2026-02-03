import { Either, right } from '@/core/either'
import { AnswerComment } from '../../../entities/answer-comment'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answers-comment-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, {
  answerComments: AnswerComment[]
}>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })
  
    return right({
      answerComments,
    })
  }
}
