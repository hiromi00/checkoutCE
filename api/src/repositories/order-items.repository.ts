import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {OrderItems, OrderItemsRelations} from '../models';

export class OrderItemsRepository extends DefaultCrudRepository<
  OrderItems,
  typeof OrderItems.prototype.id,
  OrderItemsRelations
> {
  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource,
  ) {
    super(OrderItems, dataSource);
  }
}
