import { AnswerQuestion } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repositories'
import type { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: 'question-1',
    instructorId: 'instructor-1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
