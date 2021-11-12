import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ShoppingSession} from './shopping-session.model';
import {Sneakers} from './sneakers.model';
import {Sizes} from './sizes.model';

@model({
  settings: {
    mysql: {
      table: 'cart_items'
    },
    foreignKeys: {
      fk_cartSession_id: {
        name: 'fk_cartSession_id',
        entity: 'ShoppingSession',
        entityKey: 'id',
        foreignKey: 'session_id',
      },
      fk_cartSneaker_id: {
        name: 'fk_cartSneaker_id',
        entity: 'Sneakers',
        entityKey: 'id',
        foreignKey: 'sneakers_id',
      },
      fk_cartSize_id: {
        name: 'fk_cartSize_id',
        entity: 'Sizes',
        entityKey: 'id',
        foreignKey: 'size_id',
      },
    }
  },
})
export class CartItem extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
      maximum: 100,
      default: 0
    },
    mysql: {
      columnName: 'quantity',
      dataType: 'int',
      dataPrecision: 10,
      Nullable: 'N'
    }
  })
  quantity: number;


  @belongsTo(() => ShoppingSession, {name: 'session'})
  session_id: number;

  @belongsTo(() => Sneakers, {name: 'sneakers'})
  sneakers_id: number;

  @property({
    type: 'date',
    default: Date.now
  })
  created_at?: string;

  @property({
    type: 'date',
    default: Date.now
  })
  updated_at?: string;

  @belongsTo(() => Sizes, {name: 'size'})
  size_id: number;

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
