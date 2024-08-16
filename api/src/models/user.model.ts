import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UserProfile} from './user-profile.model';
import {Brand} from './brand.model';
import {Reels} from './reels.model';
import {InfluencerBalances} from './influencer-balances.model';
import {Products} from './products.model';
import {InfluencerProduct} from './influencer-product.model';
import {InfluencerWithdraws} from './influencer-withdraws.model';
import {Orders} from './orders.model';
import {Refunds} from './refunds.model';
import {Questions} from './questions.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  userName: string;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  contactNo: string;

  @property.array(String, {
    name: 'permissions',
  })
  permissions: String[];

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  @property({
    type: 'boolean',
    required: true,
  })
  isActive: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isInfluncer?: boolean;

  @property({
    type: 'string',
  })
  otp?: string;

  @property({
    type: 'string',
  })
  otpExpireAt: string;

  @hasOne(() => UserProfile)
  userProfile: UserProfile;

  @hasMany(() => Brand)
  brands: Brand[];

  @hasMany(() => Reels)
  reels: Reels[];

  @hasOne(() => InfluencerBalances, {keyTo: 'influencerId'})
  influencerBalances: InfluencerBalances;

  @hasMany(() => Products, {through: {model: () => InfluencerProduct}})
  products: Products[];

  @hasMany(() => InfluencerWithdraws, {keyTo: 'influencerId'})
  influencerWithdraws: InfluencerWithdraws[];

  @hasMany(() => Orders)
  orders: Orders[];

  @hasMany(() => Refunds)
  refunds: Refunds[];

  @hasMany(() => Questions)
  questions: Questions[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
