import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderStatus extends Entity {
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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  serial: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;


  constructor(data?: Partial<OrderStatus>) {
    super(data);
  }
}

export interface OrderStatusRelations {
  // describe navigational properties here
}

export type OrderStatusWithRelations = OrderStatus & OrderStatusRelations;
