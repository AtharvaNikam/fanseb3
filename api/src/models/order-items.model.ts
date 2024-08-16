import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderItems extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  ordersId?: number;

  @property({
    type: 'number',
  })
  productsId?: number;

  @property({
    type: 'number',
  })
  quantity?: number;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderItemsRelations {
  // describe navigational properties here
}

export type OrderItemsWithRelations = OrderItems & OrderItemsRelations;
