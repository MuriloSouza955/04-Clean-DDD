import { InMemoryAnswersRepository } from 'test/repositores/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerCase } from './choose-question-best-answer'
import { InMemoryQuestionsRepository } from 'test/repositores/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose the question best answer.', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: new UniqueEntityId(question.id.toString()),
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId?.toString()).toEqual(answer.id.toString())
  })
  it('should not be able to chose another user question best answer.', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    const answer = makeAnswer({
      questionId: new UniqueEntityId(question.id.toString()),
    })

    await inMemoryAnswersRepository.create(answer)
    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })
    expect (result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
