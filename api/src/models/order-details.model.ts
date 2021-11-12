import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {OrderItems} from './order-items.model';

@model({
  settings: {
    mysql: {
      table: 'order_details'
    },
    foreignKeys: {
      fk_orderUser_id: {
        name: 'fk_orderUser_id',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      } 
    }
  },
})
export class OrderDetails extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(() => User, {name: 'user'})
  user_id: number;

  @hasMany(() => OrderItems, {keyTo: 'order_id'})
  orderItems: OrderItems[];

  constructor(data?: Partial<OrderDetails>) {
    super(data);
  }
}

export interface OrderDetailsRelations {
  // describe navigational properties here
}

export type OrderDetailsWithRelations = OrderDetails & OrderDetailsRelations;
