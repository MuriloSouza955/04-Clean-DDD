# Use Cases do Fórum

Todos os use cases seguem o padrão:
- **Input**: Objeto com parâmetros tipados
- **Output**: `Either<Error, Success>` (Left em falha, Right em sucesso)

## Perguntas (Questions)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **CreateQuestionUseCase** | Criar nova pergunta com anexos | QuestionsRepository |
| **EditQuestionUseCase** | Editar título, conteúdo e anexos | QuestionsRepository, QuestionAttachmentsRepository |
| **DeleteQuestionUseCase** | Deletar pergunta (apenas autor) | QuestionsRepository |
| **GetQuestionBySlugUseCase** | Buscar pergunta por slug | QuestionsRepository |
| **FetchRecentQuestionsUseCase** | Listar perguntas recentes (paginado) | QuestionsRepository |
| **FetchQuestionCommentsUseCase** | Listar comentários de uma pergunta | QuestionCommentsRepository |

## Respostas (Answers)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **AnswerQuestionUseCase** | Responder uma pergunta | AnswersRepository, QuestionsRepository |
| **EditAnswerUseCase** | Editar resposta (apenas autor) | AnswersRepository |
| **DeleteAnswerUseCase** | Deletar resposta (apenas autor) | AnswersRepository |
| **ChooseQuestionBestAnswerUseCase** | Marcar melhor resposta (apenas autor da pergunta) | QuestionsRepository, AnswersRepository |
| **FetchQuestionAnswersUseCase** | Listar respostas de uma pergunta | AnswersRepository |

## Comentários (Comments)

| Use Case | Descrição | Dependências |
|----------|-----------|--------------|
| **CommentOnQuestionUseCase** | Comentar em uma pergunta | QuestionCommentsRepository, QuestionsRepository |
| **DeleteQuestionCommentUseCase** | Deletar comentário de pergunta | QuestionCommentsRepository |
| **CommentOnAnswerUseCase** | Comentar em uma resposta | AnswerCommentsRepository, AnswersRepository |
| **DeleteAnswerCommentUseCase** | Deletar comentário de resposta | AnswerCommentsRepository |
| **FetchAnswerCommentsUseCase** | Listar comentários de uma resposta | AnswerCommentsRepository |

## Interfaces de Repositórios

| Repositório | Métodos |
|-------------|---------|
| QuestionsRepository | findById, findBySlug, findManyRecent, create, delete, save |
| AnswersRepository | findById, findManyByQuestionId, create, delete, save |
| QuestionCommentsRepository | findById, findManyByQuestionId, create, delete |
| AnswerCommentsRepository | findById, findManyByAnswerId, create, delete |
| QuestionAttachmentsRepository | findManyByQuestionId, deleteManyByQuestionId |

## Padrão de Erros

Cada use case pode retornar:
- **Right(value)** → sucesso
- **Left(ResourceNotFoundError)** → recurso não encontrado
- **Left(NotAllowedError)** → ação não permitida (ex: usuário não é o autor)
