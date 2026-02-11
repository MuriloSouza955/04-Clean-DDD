# Arquitetura do Projeto - Clean DDD

Este projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** para construir um sistema de fórum de perguntas e respostas com subdomínio de notificações.

## Estrutura de Pastas

```
src/
├── core/                        # Camada de núcleo (shared entre domínios)
│   ├── entities/                # Entidades base e abstrações
│   │   ├── entity.ts
│   │   ├── aggregate-roots.ts
│   │   ├── unique-entity-id.ts
│   │   └── watched-list.ts
│   ├── events/                  # Sistema de Domain Events
│   │   ├── domain-event.ts
│   │   ├── domain-events.ts
│   │   └── event-handler.ts
│   ├── errors/                  # Erros genéricos
│   ├── repositories/            # Tipos de repositórios
│   └── types/                   # Tipos utilitários
│
└── domain/
    ├── forum/                   # Bounded Context: Fórum
    │   ├── application/          # Camada de aplicação
    │   │   ├── repositories/    # Interfaces (contratos)
    │   └── enterprise/          # Camada de domínio
    │       ├── entities/        # Entidades de negócio
    │       ├── value-object/    # Value Objects
    │       └── events/          # Domain Events do fórum
    │
    └── notification/            # Bounded Context: Notificações
        ├── appplication/        # Camada de aplicação
        │   ├── repositories/   # Interfaces
        │   ├── use-case/        # Casos de uso
        │   └── subscribers/    # Event handlers
        └── enterprise/         # Camada de domínio
            └── notification.ts # Entidade Notification
```

## Camadas da Arquitetura

### 1. Core (Núcleo)

Componentes compartilhados e independentes de framework:

| Componente | Descrição |
|------------|-----------|
| `Entity` | Classe base para entidades com `id` e `props` |
| `AggregateRoot` | Entidade raiz de agregado (extende Entity); pode ter Domain Events |
| `UniqueEntityId` | Identificador único para entidades |
| `WatchedList<T>` | Lista observada para rastrear itens adicionados/removidos |
| `Either<L, R>` | Monad para tratamento de erros (Left = erro, Right = sucesso) |
| `Optional<T>` | Tipo utilitário para propriedades opcionais |
| `DomainEvent` | Interface para eventos de domínio |
| `DomainEvents` | Dispatcher estático para registrar e despachar eventos |
| `EventHandler` | Interface para handlers de eventos (subscribers) |

### 2. Domain (Domínio)

**Forum - Application Layer**:
- Interfaces de repositórios (sem implementação)
- Use Cases de perguntas, respostas e comentários

**Forum - Enterprise Layer**:
- Entidades (Question, Answer, QuestionComment, AnswerComment, etc.)
- Value Objects (Slug)
- Domain Events (AnswerCreatedEvent, QuestionBestAnswerChosenEvent)

**Notification - Application Layer**:
- Use Cases (SendNotification, ReadNotification)
- Subscribers (OnAnswerCreated, OnQuestionBestAnswerChosen)

**Notification - Enterprise Layer**:
- Entidade Notification

## Domain Events

Eventos de domínio permitem desacoplamento entre bounded contexts. O fluxo:

1. **Disparo**: Ao criar Answer ou escolher melhor resposta, o agregado adiciona o evento via `addDomainEvent()`
2. **Marcação**: O agregado é marcado com `DomainEvents.markAggregateForDispatch()`
3. **Dispatch**: Após persistir, chamar `DomainEvents.dispatchEventsForAggregate(id)` para executar os subscribers
4. **Subscribers**: Handlers registrados em `DomainEvents.register()` recebem o evento

| Evento | Agregado | Subscriber | Ação |
|--------|----------|------------|------|
| AnswerCreatedEvent | Answer | OnAnswerCreated | Envia notificação ao autor da pergunta |
| QuestionBestAnswerChosenEvent | Question | OnQuestionBestAnswerChosen | Envia notificação ao autor da resposta |

## Conceitos DDD Utilizados

### Entidades
- **Question** (Aggregate Root): Pergunta com título, conteúdo, slug, anexos
- **Answer** (Aggregate Root): Resposta com anexos; dispara AnswerCreatedEvent
- **QuestionComment** / **AnswerComment**: Comentários
- **QuestionAttachment** / **AnswerAttachment**: Anexos
- **Notification**: Entidade do subdomínio de notificações

### Value Objects
- **Slug**: URL amigável gerada a partir do título

### Agregados
- **Question**: aggregate root do agregado de perguntas
- **Answer**: aggregate root do agregado de respostas
- **QuestionAttachmentList** / **AnswerAttachmentList** (WatchedList)

### Padrão Either
Os use cases retornam `Either<Error, Success>`:
- `Left(error)` → falha
- `Right(success)` → sucesso

## Fluxo de Dados

```
Use Case → Repository (interface) → Implementação (ex: InMemory)
```

```
Domain Event → DomainEvents.dispatch → Subscriber → Use Case (ex: SendNotification)
```

Os use cases recebem repositórios via construtor (injeção de dependência) e nunca conhecem implementações concretas.

## Testes

- **Vitest** para testes unitários
- **Repositórios In-Memory** para testes isolados
- **Factories** em `test/factories/` para criação de entidades de teste

Execute `npm run test` para rodar os testes.
