import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Products} from './products.model';
import {ReelProducts} from './reel-products.model';

@model()
export class Reels extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'object',
    required: true,
  })
  reelLink: object;

  @property({
    type: 'object',
    required: true,
  })
  thumbnail: object;

  @property({
    type: 'string',
    required: true,
  })
  videoDuration: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => Products, {through: {model: () => ReelProducts}})
  products: Products[];
  // @property({
  //   type: 'number',
  // })
  // userId?: number;

  constructor(data?: Partial<Reels>) {
    super(data);
  }
}

export interface ReelsRelations {
  // describe navigational properties here
}

export type ReelsWithRelations = Reels & ReelsRelations;
