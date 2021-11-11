import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<OrderItems>) {
    super(data);
  }
}

export interface OrderItemsRelations {
  // describe navigational properties here
}

export type OrderItemsWithRelations = OrderItems & OrderItemsRelations;
