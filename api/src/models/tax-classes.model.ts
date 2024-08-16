import {Entity, model, property} from '@loopback/repository';

@model()
export class TaxClasses extends Entity {
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
    required: true,
  })
  rate: number;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'string',
  })
  zip?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'boolean',
    default: 1,
  })
  isGlobal?: boolean;

  @property({
    type: 'boolean',
    default: 1,
  })
  onShipping?: boolean;

  @property({
    type: 'date',
  })
  createdAt?: Date;

  @property({
    type: 'date',
  })
  updatedAt?: Date;


  constructor(data?: Partial<TaxClasses>) {
    super(data);
  }
}

export interface TaxClassesRelations {
  // describe navigational properties here
}

export type TaxClassesWithRelations = TaxClasses & TaxClassesRelations;
