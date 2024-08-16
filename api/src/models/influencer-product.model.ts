import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Products} from './products.model';

@model()
export class InfluencerProduct extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Products)
  productsId: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'object',
  })
  featureInfluencerImageUrl?: object;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  constructor(data?: Partial<InfluencerProduct>) {
    super(data);
  }
}

export interface InfluencerProductRelations {
  // describe navigational properties here
}

export type InfluencerProductWithRelations = InfluencerProduct &
  InfluencerProductRelations;
