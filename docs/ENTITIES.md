# Entidades do Domínio

## Hierarquia de Entidades

```
Entity (core)
    ├── AggregateRoot
    │   └── Question
    │
    └── Answer, QuestionComment, AnswerComment, QuestionAttachment, etc.
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

### Answer
Resposta a uma pergunta.

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| content | string | Conteúdo da resposta |
| authorId | UniqueEntityId | Autor |
| questionId | UniqueEntityId | Pergunta vinculada |
| createdAt | Date | Data de criação |
| updatedAt | Date? | Data de atualização |

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

### QuestionAttachmentList
Lista especializada (WatchedList) para gerenciar anexos de perguntas.
- Rastreia itens novos, atuais e removidos
- Usada no agregado Question para sincronização com banco

## Value Objects

### Slug
Identificador URL-friendly gerado a partir de texto.

```typescript
Slug.createFromText("Minha Pergunta") // → "minha-pergunta"
```

## Entidades de Usuário

- **Student**: Estudante do fórum
- **Instructor**: Instrutor (autoridade)

## Erros de Domínio

| Erro | Quando ocorre |
|------|---------------|
| ResourceNotFoundError | Recurso não encontrado (pergunta, resposta, etc.) |
| NotAllowedError | Usuário não autorizado (ex: deletar pergunta de outro) |
