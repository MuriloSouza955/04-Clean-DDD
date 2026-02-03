import { InMemoryAnswersRepository } from 'test/repositores/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositores/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on Answer.', async () => {
    const answer = makeAnswer()
    
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      AnswerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual('Comentário teste')
  })
})
