import {Entity, model, property} from '@loopback/repository';

@model()
export class InfluencerBalances extends Entity {
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
  influencer_commision_rate: number;


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
    type: 'number',
    default: 0,
  })
  totalOrders?: number;

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
  influencerId?: number;

  constructor(data?: Partial<InfluencerBalances>) {
    super(data);
  }
}

export interface InfluencerBalancesRelations {
  // describe navigational properties here
}

export type InfluencerBalancesWithRelations = InfluencerBalances & InfluencerBalancesRelations;
