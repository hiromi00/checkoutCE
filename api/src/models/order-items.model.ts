import {Entity, model, property, belongsTo} from '@loopback/repository';
import {OrderDetails} from './order-details.model';
import {Sneakers} from './sneakers.model';

@model({
  settings: {
    mysql: {
      table: 'order_items'
    },
    foreignKeys: {
      fk_orderIOrder_id: {
        name: 'fk_orderIOrder_id',
        entity: 'OrderDetails',
        entityKey: 'id',
        foreignKey: 'order_id',
      } ,
      fk_orderSneakers_id: {
        name: 'fk_orderSneakers_id',
        entity: 'Sneakers',
        entityKey: 'id',
        foreignKey: 'sneakers_id',
      } ,
    }
  },
})
export class OrderItems extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  updated_at?: string;

  @belongsTo(() => OrderDetails, {name: 'order'})
  order_id: number;

  @belongsTo(() => Sneakers, {name: 'sneakers'})
  sneakers_id: number;

  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderItemsRelations {
  // describe navigational properties here
}

export type OrderItemsWithRelations = OrderItems & OrderItemsRelations;
