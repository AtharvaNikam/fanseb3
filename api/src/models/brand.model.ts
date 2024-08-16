import {Entity, belongsTo, model, property, hasOne, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {BrandBalances} from './brand-balances.model';
import {Products} from './products.model';
import {Orders} from './orders.model';

@model()
export class Brand extends Entity {
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
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'object',
    required: true,
  })
  address: object;

  @property({
    type: 'object',
    required: true,
  })
  paymentInfo: object;

  @property({
    type: 'object',
  })
  socials?: object;

  @property({
    type: 'string',
    required: true,
  })
  profileImg: string;

  @property({
    type: 'string',
    required: true,
  })
  coverImage: string;

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

  @hasOne(() => BrandBalances)
  brandBalances: BrandBalances;

  @hasMany(() => Products)
  products: Products[];

  @hasMany(() => Orders)
  orders: Orders[];

  constructor(data?: Partial<Brand>) {
    super(data);
  }
}

export interface BrandRelations {
  // describe navigational properties here
}

export type BrandWithRelations = Brand & BrandRelations;
