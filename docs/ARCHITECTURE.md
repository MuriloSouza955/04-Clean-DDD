# Arquitetura do Projeto - Clean DDD

Este projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** para construir um sistema de fórum de perguntas e respostas.

## Estrutura de Pastas

```
src/
├── core/                    # Camada de núcleo (shared entre domínios)
│   ├── entities/           # Entidades base e abstrações
│   ├── errors/              # Erros genéricos
│   ├── repositories/        # Tipos de repositórios
│   └── types/               # Tipos utilitários
│
└── domain/
    └── forum/               # Bounded Context: Fórum
        ├── application/     # Camada de aplicação
        │   └── repositories/ # Interfaces (contratos)
        │
        └── enterprise/      # Camada de domínio
            ├── entities/    # Entidades de negócio
            ├── value-object/ # Value Objects e Use Cases
            │   ├── use-cases/ # Casos de uso
            │   └── errors/   # Erros de domínio
```

## Camadas da Arquitetura

### 1. Core (Núcleo)

Componentes compartilhados e independentes de framework:

| Componente | Descrição |
|------------|-----------|
| `Entity` | Classe base para entidades com `id` e `props` |
| `AggregateRoot` | Entidade raiz de agregado (extende Entity) |
| `UniqueEntityId` | Identificador único para entidades |
| `WatchedList<T>` | Lista observada para rastrear itens adicionados/removidos |
| `Either<L, R>` | Monad para tratamento de erros (Left = erro, Right = sucesso) |
| `Optional<T>` | Tipo utilitário para propriedades opcionais |

### 2. Domain (Domínio)

**Application Layer** - Contratos e interfaces:
- Interfaces de repositórios (sem implementação)
- Dependência invertida: use cases dependem de abstrações

**Enterprise Layer** - Regras de negócio:
- Entidades
- Value Objects (Slug)
- Use Cases (orquestração)
- Erros de domínio

## Conceitos DDD Utilizados

### Entidades
- **Question** (Aggregate Root): Pergunta com título, conteúdo, slug, anexos
- **Answer**: Resposta vinculada a uma pergunta
- **QuestionComment** / **AnswerComment**: Comentários
- **QuestionAttachment**: Anexos da pergunta

### Value Objects
- **Slug**: URL amigável gerada a partir do título (ex: "Minha Pergunta" → "minha-pergunta")

### Agregados
- **Question** é o aggregate root do agregado de perguntas
- **QuestionAttachmentList** (WatchedList) gerencia anexos da pergunta

### Padrão Either
Os use cases retornam `Either<Error, Success>`:
- `Left(error)` → falha
- `Right(success)` → sucesso

## Fluxo de Dados

```
Use Case → Repository (interface) → Implementação (ex: InMemory)
```

Os use cases recebem repositórios via construtor (injeção de dependência) e nunca conhecem implementações concretas.

## Testes

- **Vitest** para testes unitários
- **Repositórios In-Memory** para testes isolados
- **Factories** em `test/factories/` para criação de entidades de teste

Execute `npm run test` para rodar os testes.
