import { AggregateRoot } from "../entities/aggregate-roots"
import { UniqueEntityId } from "../entities/unique-entity-id"
import { DomainEvent } from "./domain-event"
import { DomainEvents } from "./domain-events"
import { vi } from 'vitest'

class CustomDomainEvent implements DomainEvent {
    public ocurredAt: Date
    private aggregate: CustonAggregate

    constructor(aggregate: CustonAggregate) {
      this.ocurredAt = new Date()
      this.aggregate = aggregate
    }

    public getAggregateId(): UniqueEntityId {
      return new UniqueEntityId(this.aggregate.id)
    }
  }

class CustonAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustonAggregate({})
    aggregate.addDomainEvent(new CustomDomainEvent(aggregate))
    return aggregate
  }
}

describe ('domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Ouvindo o evento de resposta criada
    DomainEvents.register(callbackSpy, CustomDomainEvent.name)

    // Criando a resposta
    const aggregate = CustonAggregate.create()
    // Verificando se o evento foi adicionado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Disparando o evento para salvar a resposta
    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(aggregate.id))
    // Verificando se o callback foi chamado para salvar a resposta e disparar o evento
    expect(callbackSpy).toHaveBeenCalled()
    // Verificando se os eventos foram limpos após salvar a resposta
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})