import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Products} from './products.model';
import {User} from './user.model';

@model()
export class Questions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  question: string;

  @property({
    type: 'string',
  })
  answer?: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @belongsTo(() => Products)
  productsId: number;


  // @property({
  @belongsTo(() => User)
  userId: number;
  //   type: 'number',
  // })
  // userId?: number;

  @property({
    type: 'number',
  })
  brandId?: number;


  constructor(data?: Partial<Questions>) {
    super(data);
  }
}

export interface QuestionsRelations {
  // describe navigational properties here
}

export type QuestionsWithRelations = Questions & QuestionsRelations;
