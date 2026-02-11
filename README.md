# 04 - Clean DDD

> **Status: Projeto finalizado**

Projeto de **Fórum de Perguntas e Respostas** construído com **Clean Architecture** e **Domain-Driven Design (DDD)**.

## Sobre o Projeto

Sistema de fórum onde usuários podem:
- Criar e gerenciar perguntas com anexos
- Responder perguntas com anexos
- Comentar em perguntas e respostas
- Marcar a melhor resposta
- Receber notificações ao criar respostas e ao marcar melhor resposta

## Tecnologias

- **TypeScript** - Linguagem
- **Vitest** - Testes unitários
- **dayjs** - Manipulação de datas
- **faker** - Dados falsos para testes

## Scripts

```bash
# Rodar testes
npm run test

# Rodar testes em modo watch
npm run test:watch

# Lint
npm run lint

# Lint com correção automática
npm run lint:fix
```

## Documentação

- [**Arquitetura**](./docs/ARCHITECTURE.md) - Estrutura Clean DDD, camadas, Domain Events e conceitos
- [**Entidades**](./docs/ENTITIES.md) - Entidades do domínio, value objects e erros
- [**Use Cases**](./docs/USE-CASES.md) - Lista de casos de uso, subscribers e repositórios

## Conceitos DDD Abordados

| Conceito | Exemplo |
|----------|---------|
| **Domain Experts** | Linguagem ubíqua com stakeholders |
| **Entidades** | Question, Answer, Comment, Notification |
| **Value Objects** | Slug |
| **Agregados** | Question e Answer como aggregate roots |
| **Watched List** | QuestionAttachmentList, AnswerAttachmentList |
| **Bounded Context** | Forum (fórum) e Notification (notificações) |
| **Domain Events** | AnswerCreatedEvent, QuestionBestAnswerChosenEvent |
| **Subscribers** | OnAnswerCreated, OnQuestionBestAnswerChosen |
| **Subdomínios** | Forum (core), Notification (supporting/generic) |

## Estrutura do Projeto

```
src/
├── core/                      # Núcleo compartilhado
│   ├── entities/              # Entity, AggregateRoot, UniqueEntityId, WatchedList
│   ├── events/                # DomainEvent, DomainEvents
│   ├── errors/                # Erros genéricos
│   └── repositories/         # Tipos de paginação
│
└── domain/
    ├── forum/                 # Bounded Context: Fórum
    │   ├── application/      # Repositórios, Use Cases
    │   └── enterprise/       # Entidades, Value Objects, Events
    │
    └── notification/         # Bounded Context: Notificações
        ├── appplication/     # Use Cases, Subscribers
        └── enterprise/       # Entidade Notification

test/
├── factories/                 # Factories para testes
└── repositores/               # Implementações in-memory
```

---

## Conceitos DDD - Resumo

- **Domain Experts**: Conversa com stakeholders; linguagem ubíqua (Cliente, Fornecedor, etc.)
- **Subdomínios**:
  - **Core**: O que traz valor principal (ex: Compra, Catálogo, Pagamento)
  - **Supporting**: Dá suporte ao core (ex: Estoque)
  - **Generic**: Necessário, mas não central (ex: Notificações, Chat, Promoções)
