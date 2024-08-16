import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Products} from './products.model';

@model()
export class Reviews extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  ratings: number;

  @property({
    type: 'number',
    required: true,
  })
  brandId: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  review: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  attachments?: string[];

  @property({
    type: 'boolean',
    required: true,
  })
  isPurchased: boolean;

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
  //   type: 'number',
  // })
  // productsId?: number;

  constructor(data?: Partial<Reviews>) {
    super(data);
  }
}

export interface ReviewsRelations {
  // describe navigational properties here
}

export type ReviewsWithRelations = Reviews & ReviewsRelations;
