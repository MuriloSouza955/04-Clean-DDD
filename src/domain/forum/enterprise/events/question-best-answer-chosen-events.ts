import type { Question } from "@/domain/forum/enterprise/entities/question"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { DomainEvent } from "@/core/events/domain-event"

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Question
  public bestAnswerId: UniqueEntityId

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
    this.question = question
  }
  getAggregateId(): UniqueEntityId {
    return new UniqueEntityId(this.question.id)
  }
}