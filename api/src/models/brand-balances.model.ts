import {Entity, model, property} from '@loopback/repository';

@model()
export class BrandBalances extends Entity {
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
  })
  adminCommissionRate?: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  totalEarnings?: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  withdrawnAmount?: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  currentBalance?: number;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @property({
    type: 'number',
  })
  brandId?: number;

  constructor(data?: Partial<BrandBalances>) {
    super(data);
  }
}

export interface BrandBalancesRelations {
  // describe navigational properties here
}

export type BrandBalancesWithRelations = BrandBalances & BrandBalancesRelations;
