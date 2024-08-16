import {Entity, model, property} from '@loopback/repository';

export enum  ShippingClassType{
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}

@model()
export class ShippingClasses extends Entity {
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
    type: 'number',
    default: 0.0,
    dataType: 'decimal',
    precision: 30,
    scale: 2,
    required: true,
  })
  amount: number;

  @property({
    type: 'boolean',
    default: 1,
  })
  is_global?: boolean;

  @property({
    type: 'string',
    default: ShippingClassType.FIXED,
  })
  type?: string;
  
  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;

  constructor(data?: Partial<ShippingClasses>) {
    super(data);
  }
}

export interface ShippingClassesRelations {
  // describe navigational properties here
}

export type ShippingClassesWithRelations = ShippingClasses & ShippingClassesRelations;
