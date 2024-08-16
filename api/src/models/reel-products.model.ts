import {Entity, model, property} from '@loopback/repository';

@model()
export class ReelProducts extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  reelsId?: number;

  @property({
    type: 'number',
  })
  productsId?: number;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  constructor(data?: Partial<ReelProducts>) {
    super(data);
  }
}

export interface ReelProductsRelations {
  // describe navigational properties here
}

export type ReelProductsWithRelations = ReelProducts & ReelProductsRelations;
