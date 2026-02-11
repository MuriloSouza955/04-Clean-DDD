# Entidades do Domínio

## Hierarquia de Entidades

```
Entity (core)
    ├── AggregateRoot
    │   ├── Question
    │   └── Answer
    │
    └── QuestionComment, AnswerComment, QuestionAttachment, AnswerAttachment, Notification
```

## Entidades Principais

### Question (Aggregate Root)
Pergunta do fórum.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| authorId | UniqueEntityId | Autor da pergunta |
| title | string | Título |
| content | string | Conteúdo |
| slug | Slug | URL amigável (value object) |
| attachments | QuestionAttachmentList | Lista de anexos (WatchedList) |
| bestAnswerId | UniqueEntityId? | ID da melhor resposta |
| createdAt | Date | Data de criação |
| updatedAt | Date? | Data de atualização |

**Métodos**: `create()`, getters/setters, `excerpt`, `isNew`  
**Events**: QuestionBestAnswerChosenEvent (ao marcar melhor resposta)

### Answer (Aggregate Root)
Resposta a uma pergunta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| content | string | Conteúdo da resposta |
| authorId | UniqueEntityId | Autor |
| questionId | UniqueEntityId | Pergunta vinculada |
| attachments | AnswerAttachmentList | Lista de anexos (WatchedList) |
| createdAt | Date | Data de criação |
| updatedAt | Date? | Data de atualização |

**Métodos**: `create()`, getters/setters, `excerpt`  
**Events**: AnswerCreatedEvent (ao criar nova resposta)

### QuestionComment
Comentário em uma pergunta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| content | string | Conteúdo |
| authorId | UniqueEntityId | Autor |
| questionId | UniqueEntityId | Pergunta vinculada |
| createdAt | Date | Data de criação |

### AnswerComment
Comentário em uma resposta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| content | string | Conteúdo |
| authorId | UniqueEntityId | Autor |
| answerId | UniqueEntityId | Resposta vinculada |
| createdAt | Date | Data de criação |

### QuestionAttachment
Anexo vinculado a uma pergunta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| questionId | UniqueEntityId | Pergunta |
| attachmentId | UniqueEntityId | ID do arquivo |

### AnswerAttachment
Anexo vinculado a uma resposta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| answerId | UniqueEntityId | Resposta |
| attachmentId | UniqueEntityId | ID do arquivo |

### QuestionAttachmentList / AnswerAttachmentList
Listas especializadas (WatchedList) para gerenciar anexos.
- Rastreiam itens novos, atuais e removidos
- Usadas nos agregados para sincronização com banco

### Notification
Entidade do subdomínio de notificações.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| recipientId | UniqueEntityId | Destinatário |
| title | string | Título |
| content | string | Conteúdo |
| readAt | Date? | Data de leitura |
| createdAt | Date | Data de criação |

**Métodos**: `create()`, `read()` (marca como lida)

## Value Objects

### Slug
Identificador URL-friendly gerado a partir de texto.

```typescript
Slug.createFromText("Minha Pergunta") // → "minha-pergunta"
```

## Entidades de Usuário

- **Student**: Estudante do fórum
- **Instructor**: Instrutor (autoridade)

## Domain Events

| Evento | Agregado | Disparado em |
|--------|----------|--------------|
| AnswerCreatedEvent | Answer | Answer.create() quando nova resposta |
| QuestionBestAnswerChosenEvent | Question | chooseBestAnswer() |

## Erros de Domínio

| Erro | Quando ocorre |
|------|----------------|
| ResourceNotFoundError | Recurso não encontrado (pergunta, resposta, etc.) |
| NotAllowedError | Usuário não autorizado (ex: deletar pergunta de outro) |
