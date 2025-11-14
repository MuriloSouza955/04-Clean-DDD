import { expect, test } from 'vitest';
import { AnswerQuestion } from './answer-question';

test('create an answer', () => {
  const answerQuestion = new AnswerQuestion();
  
  const answer = answerQuestion.execute({
    questionId: 'question-1',
    instructorId: 'instructor-1',
    content: 'Nova resposta'
  });

  expect(answer.content).toEqual('Nova resposta');
});