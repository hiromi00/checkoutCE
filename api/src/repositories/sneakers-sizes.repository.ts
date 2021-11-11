import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {SneakersSizes, SneakersSizesRelations} from '../models';

export class SneakersSizesRepository extends DefaultCrudRepository<
  SneakersSizes,
  typeof SneakersSizes.prototype.id,
  SneakersSizesRelations
> {
  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource,
  ) {
    super(SneakersSizes, dataSource);
  }
}
