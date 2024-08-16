import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property, hasOne} from '@loopback/repository';
import {Brand} from './brand.model';
import {OrderItems} from './order-items.model';
import {Products} from './products.model';
import {User} from './user.model';
import {Refunds} from './refunds.model';

@model()
export class Orders extends Entity {
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
  trackingNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  status?: number;

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
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  salesTax?: string;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  paidTotal?: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  subTotal: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  discount?: number;

  @property({
    type: 'string',
  })
  paymentId?: string;

  @property({
    type: 'string',
  })
  paymentGateway?: string;

  @property({
    type: 'string',
    required: true,
  })
  shippingAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  billingAddress: string;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
  })
  deliveryFee?: number;

  @property({
    type: 'number',
  })
  parentId?: number;
  @property({
    type: 'number',
  })
  influencerId?: number;

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

  @belongsTo(() => Brand)
  brandId: number;

  @hasMany(() => Products, {through: {model: () => OrderItems}})
  products: Products[];

  @hasOne(() => Refunds)
  refunds: Refunds;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;
