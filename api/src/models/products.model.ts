import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Brand} from './brand.model';
import {Reviews} from './reviews.model';
import {Questions} from './questions.model';

@model()
export class Products extends Entity {
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
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  sale_price: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  min_price: number;

  @property({
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  max_price: number;

  @property({
    type: 'string',
  })
  sku?: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'boolean',
    required: true,
  })
  inStock: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isTaxable: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'string',
  })
  product_type?: string;

  @property({
    type: 'string',
  })
  unit?: string;

  @property({
    type: 'string',
  })
  height?: string;

  @property({
    type: 'string',
  })
  width?: string;

  @property({
    type: 'string',
  })
  length?: string;

  @property({
    type: 'object',
  })
  image?: object;

  @property({
    type: 'object',
  })
  video?: object;

  @property({
    type: 'array',
    itemType: 'object',
  })
  gallery?: object[];

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

  @hasMany(() => Reviews)
  reviews: Reviews[];

  @hasMany(() => Questions)
  questions: Questions[];

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
