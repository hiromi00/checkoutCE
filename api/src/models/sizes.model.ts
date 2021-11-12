import {Entity, model, property, hasMany} from '@loopback/repository';
import {CartItem} from './cart-item.model';

@model({
  settings: {
    mysql: {
      table: 'sizes'
    },
  },
})
export class Sizes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  id: number;

  @property({
    type: 'number',
    jsonSchema: {
      minimum: 20.0,
      maximum: 30.0, 
      default: 0
    },
    mysql: {
      columnName: 'value',
      dataType: 'float',
      dataPrecision: 9,
      dataScale: 2,
      nullable: 'N'
    }
  })
  value: number;

  @property({
    type: 'date',
    default: Date.now,
    mysql: {
      default: Date.now
    }
  })
  created_at: string;

  @property({
    type: 'date',
    default: Date.now,
  })
  updated_at: string;

  @hasMany(() => CartItem, {keyTo: 'size_id'})
  cartItems: CartItem[];

  constructor(data?: Partial<Sizes>) {
    super(data);
  }
}

export interface SizesRelations {
  // describe navigational properties here
}

export type SizesWithRelations = Sizes & SizesRelations;
