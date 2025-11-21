import { expect, test } from 'vitest';
import { AnswerQuestion } from './answer-question';
import type { Answer } from '../entities/answer';

const fakeAnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository);
  
  const answer = await answerQuestion.execute({
    questionId: 'question-1',
    instructorId: 'instructor-1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
});