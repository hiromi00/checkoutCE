import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {ShoppingSession, ShoppingSessionRelations} from '../models';

export class ShoppingSessionRepository extends DefaultCrudRepository<
  ShoppingSession,
  typeof ShoppingSession.prototype.id,
  ShoppingSessionRelations
> {
  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource,
  ) {
    super(ShoppingSession, dataSource);
  }
}
