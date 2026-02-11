# Use Cases do Projeto

Todos os use cases seguem o padrão:
- **Input**: Objeto com parâmetros tipados
- **Output**: `Either<Error, Success>` (Left em falha, Right em sucesso)

## Bounded Context: Forum

### Perguntas (Questions)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **CreateQuestionUseCase** | Criar nova pergunta com anexos | QuestionsRepository |
| **EditQuestionUseCase** | Editar título, conteúdo e anexos | QuestionsRepository, QuestionAttachmentsRepository |
| **DeleteQuestionUseCase** | Deletar pergunta (apenas autor) | QuestionsRepository |
| **GetQuestionBySlugUseCase** | Buscar pergunta por slug | QuestionsRepository |
| **FetchRecentQuestionsUseCase** | Listar perguntas recentes (paginado) | QuestionsRepository |
| **FetchQuestionCommentsUseCase** | Listar comentários de uma pergunta | QuestionCommentsRepository |

### Respostas (Answers)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **AnswerQuestionUseCase** | Responder uma pergunta com anexos | AnswersRepository, QuestionsRepository, AnswerAttachmentsRepository |
| **EditAnswerUseCase** | Editar resposta e anexos (apenas autor) | AnswersRepository, AnswerAttachmentsRepository |
| **DeleteAnswerUseCase** | Deletar resposta (apenas autor) | AnswersRepository |
| **ChooseQuestionBestAnswerUseCase** | Marcar melhor resposta (apenas autor da pergunta) | QuestionsRepository, AnswersRepository |
| **FetchQuestionAnswersUseCase** | Listar respostas de uma pergunta | AnswersRepository |

### Comentários (Comments)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **CommentOnQuestionUseCase** | Comentar em uma pergunta | QuestionCommentsRepository, QuestionsRepository |
| **DeleteQuestionCommentUseCase** | Deletar comentário de pergunta | QuestionCommentsRepository |
| **CommentOnAnswerUseCase** | Comentar em uma resposta | AnswerCommentsRepository, AnswersRepository |
| **DeleteAnswerCommentUseCase** | Deletar comentário de resposta | AnswerCommentsRepository |
| **FetchAnswerCommentsUseCase** | Listar comentários de uma resposta | AnswerCommentsRepository |

## Bounded Context: Notification

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **SendNotificationUseCase** | Enviar notificação ao destinatário | NotificationsRepository |
| **ReadNotificationUseCase** | Marcar notificação como lida | NotificationsRepository |

## Subscribers (Domain Event Handlers)

Os subscribers escutam eventos de domínio e executam ações (ex: enviar notificações).

| Subscriber | Evento | Ação |
|------------|--------|------|
| **OnAnswerCreated** | AnswerCreatedEvent | Envia notificação ao autor da pergunta informando nova resposta |
| **OnQuestionBestAnswerChosen** | QuestionBestAnswerChosenEvent | Envia notificação ao autor da resposta escolhida |

## Interfaces de Repositórios

### Forum

| Repositório | Métodos |
|-------------|---------|
| QuestionsRepository | findById, findBySlug, findManyRecent, create, delete, save |
| AnswersRepository | findById, findManyByQuestionId, create, delete, save |
| QuestionCommentsRepository | findById, findManyByQuestionId, create, delete |
| AnswerCommentsRepository | findById, findManyByAnswerId, create, delete |
| QuestionAttachmentsRepository | findManyByQuestionId, deleteManyByQuestionId |
| AnswerAttachmentsRepository | findManyByAnswerId, deleteManyByAnswerId |

### Notification

| Repositório | Métodos |
|-------------|---------|
| NotificationsRepository | findById, findManyByRecipientId, create, save |

## Padrão de Erros

Cada use case pode retornar:
- **Right(value)** → sucesso
- **Left(ResourceNotFoundError)** → recurso não encontrado
- **Left(NotAllowedError)** → ação não permitida (ex: usuário não é o autor)
