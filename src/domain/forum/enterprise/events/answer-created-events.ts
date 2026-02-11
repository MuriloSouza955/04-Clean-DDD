import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { DomainEvent } from "@/core/events/domain-event"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  private answer: Answer

  constructor(answer: Answer) {
    this.ocurredAt = new Date()
    this.answer = answer
  }

  get value(): Answer {
    return this.answer
  }

  getAggregateId(): UniqueEntityId {
    return new UniqueEntityId(this.answer.id)
  }
}