import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answers-comment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  AnswerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {
  answerComment: AnswerComment
}>

export class CommentOnAnswerUseCase {
  constructor(private AnswersRepository: AnswersRepository,
    private AnswerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    AnswerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.AnswersRepository.findById(AnswerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(AnswerId),
      content,
    })

    await this.AnswerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })   
  }
}
