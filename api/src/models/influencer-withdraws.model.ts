import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class InfluencerWithdraws extends Entity {
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

  @belongsTo(() => User)
  influencerId: number;

  constructor(data?: Partial<InfluencerWithdraws>) {
    super(data);
  }
}

export interface InfluencerWithdrawsRelations {
  // describe navigational properties here
}

export type InfluencerWithdrawsWithRelations = InfluencerWithdraws &
  InfluencerWithdrawsRelations;
