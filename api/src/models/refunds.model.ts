import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orders} from './orders.model';
import {User} from './user.model';

@model()
export class Refunds extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    default: 'pending',
  })
  status?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  images?: string[];

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @belongsTo(() => Orders)
  ordersId: number;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Refunds>) {
    super(data);
  }
}

export interface RefundsRelations {
  // describe navigational properties here
}

export type RefundsWithRelations = Refunds & RefundsRelations;
