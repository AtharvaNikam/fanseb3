import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Brand} from './brand.model';

@model()
export class BrandWithdraws extends Entity {
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
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  paymentMethod: string;

  @property({
    type: 'string',
    default: 'pending',
  })
  status?: string;

  @property({
    type: 'string',
  })
  details?: string;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @belongsTo(() => Brand)
  brandId: number;

  constructor(data?: Partial<BrandWithdraws>) {
    super(data);
  }
}

export interface BrandWithdrawsRelations {
  // describe navigational properties here
}

export type BrandWithdrawsWithRelations = BrandWithdraws &
  BrandWithdrawsRelations;
