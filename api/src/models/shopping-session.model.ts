import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {CartItem} from './cart-item.model';

@model({
  settings: {
    mysql: {
      table: 'shopping_session'
    },
    foreignKeys: {
      fk_shoppingUser_id: {
        name: 'fk_shoppingUser_id',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      } 
    }
  },
})
export class ShoppingSession extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    jsonSchema: {
      minimum: 0.0,
      maximum: 9999999.0,
      default: 0
    },
    mysql: {
      columnName: 'total',
      dataType: 'float',
      dataPrecision: 9,
      dataScale: 2,
    }
  })
  total?: number;

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

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  @hasMany(() => CartItem, {keyTo: 'session_id'})
  cartItems: CartItem[];

  constructor(data?: Partial<ShoppingSession>) {
    super(data);
  }
}

export interface ShoppingSessionRelations {
  // describe navigational properties here
}

export type ShoppingSessionWithRelations = ShoppingSession & ShoppingSessionRelations;
