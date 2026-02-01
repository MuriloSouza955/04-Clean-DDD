import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answers-comment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  AnswerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

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
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(AnswerId),
      content,
    })

    await this.AnswerCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
   
  }
}
