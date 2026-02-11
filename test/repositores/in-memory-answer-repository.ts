import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string){
    const answer = this.items.find((item) => item.id.toString() === id)
    
    if (!answer) {
      return null
    }
    return answer
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams){
    const answers = this.items.filter((item) => item.questionId.toString() === questionId)
    .slice((params.page - 1) * 20, params.page * 20)
    
    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(answer.id))
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer
    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(answer.id))
  }
}
