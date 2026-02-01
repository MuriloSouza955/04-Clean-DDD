import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question"
import { Slug } from "@/domain/forum/enterprise/entities/value-object/slug"
import {faker} from '@faker-js/faker'

export function makeQuestion(
  override:
  Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create({
    authorId: new UniqueEntityId('author-1'),
    title: faker.lorem.sentence(),
    slug: Slug.create(faker.lorem.slug(5)),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return question
}