import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {Sizes, SizesRelations} from '../models';

export class SizesRepository extends DefaultCrudRepository<
  Sizes,
  typeof Sizes.prototype.id,
  SizesRelations
> {
  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource,
  ) {
    super(Sizes, dataSource);
  }
}
