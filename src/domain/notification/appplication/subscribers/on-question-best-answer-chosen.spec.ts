import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswersRepository } from "test/repositores/in-memory-answer-repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositores/in-memory-answer-attachments-repository"
import { InMemoryQuestionsRepository } from "test/repositores/in-memory-questions-repository"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "@/domain/notification/appplication/use-case/send-notification"
import { InMemoryQuestionAttachmentsRepository } from "test/repositores/in-memory-question-attachments-repository"
import { InMemoryNotificationsRepository } from "test/repositores/in-memory-notifications-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { makeQuestion } from "test/factories/make-question"
import { MockInstance } from "vitest"
import { waitFor } from "test/utils/wait-for"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
(request: SendNotificationUseCaseRequest) => Promise<SendNotificationUseCaseResponse>
>;

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotificationUseCase)
  })

  it('should send a notification when a question best answer is chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({questionId: new UniqueEntityId(question.id.toString())})

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = new UniqueEntityId(answer.id.toString())
    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
