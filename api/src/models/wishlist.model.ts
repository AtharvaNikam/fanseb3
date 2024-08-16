import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Products} from './products.model';
import {User} from './user.model';

@model()
export class Wishlist extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;
  @belongsTo(() => Products)
  productsId: number;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Wishlist>) {
    super(data);
  }
}

export interface WishlistRelations {
  // describe navigational properties here
}

export type WishlistWithRelations = Wishlist & WishlistRelations;
