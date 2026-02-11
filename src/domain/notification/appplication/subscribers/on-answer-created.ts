import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-events";
import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { SendNotificationUseCase } from "@/domain/notification/appplication/use-case/send-notification";

export class OnAnswerCreated implements EventHandler{
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ){
    this.setupSubscriptions()
  }
  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    )
  }

  private async sendNewAnswerNotification(event: AnswerCreatedEvent) {
    const answer = event.value
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}