import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {OrderDetails, OrderDetailsRelations} from '../models';

export class OrderDetailsRepository extends DefaultCrudRepository<
  OrderDetails,
  typeof OrderDetails.prototype.id,
  OrderDetailsRelations
> {
  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource,
  ) {
    super(OrderDetails, dataSource);
  }
}
