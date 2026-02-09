# DDD (Domain-Driven-Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa com o stakeholder (cliente)
  - Pessoas experts (atendente por exemplo)
- Linguagem ubíquia
  - ex:
    - Para o programador:
      - Usuário
    - Para o domain expert
      - Cliente
      - Fornecedor
      - Atendente
      - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bouced Context)
- Entidades
- Casos de uso

=========================

# 04 - Clean DDD

Projeto de **Fórum de Perguntas e Respostas** construído com **Clean Architecture** e **Domain-Driven Design (DDD)**.

## Sobre o Projeto

Sistema de fórum onde usuários podem:
- Criar e gerenciar perguntas
- Responder perguntas
- Comentar em perguntas e respostas
- Marcar a melhor resposta

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

- [**Arquitetura**](./docs/ARCHITECTURE.md) - Estrutura Clean DDD, camadas e conceitos
- [**Entidades**](./docs/ENTITIES.md) - Entidades do domínio, value objects e erros
- [**Use Cases**](./docs/USE-CASES.md) - Lista de casos de uso e repositórios

## Conceitos DDD Abordados

| Conceito | Exemplo |
|----------|---------|
| **Domain Experts** | Linguagem ubíqua com stakeholders |
| **Entidades** | Question, Answer, Comment |
| **Value Objects** | Slug |
| **Agregados** | Question (aggregate root) com QuestionAttachmentList |
| **Watched List** | Rastreamento de itens adicionados/removidos |
| **Bounded Context** | Forum (fórum de perguntas) |

## Estrutura do Projeto

```
src/
├── core/           # Núcleo compartilhado (Entity, Either, WatchedList)
└── domain/forum/   # Domínio do fórum
    ├── application/  # Contratos (repositórios)
    └── enterprise/   # Entidades, use cases, value objects

test/
├── factories/      # Factories para testes
└── repositores/    # Implementações in-memory
```
===========================

# Subdomínios

-Core:
  - O que dá dinheiro
-Supporting:
  - Da suporte para o core funcionar
-Generic:
  -Voce precisa, mas não são tão importantes

## Exemplos

###Core
- Compra
- Catálogo
- Pagamento
- Entrega
- Faturamento

###Supporting
- Estoque

###Generic
  - Notificações ao cliente
  - Promoções
  - Chat
  