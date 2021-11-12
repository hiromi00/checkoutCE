import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {OrderItems, OrderItemsRelations, OrderDetails, Sneakers} from '../models';
import {OrderDetailsRepository} from './order-details.repository';
import {SneakersRepository} from './sneakers.repository';

export class OrderItemsRepository extends DefaultCrudRepository<
  OrderItems,
  typeof OrderItems.prototype.id,
  OrderItemsRelations
> {

  public readonly order: BelongsToAccessor<OrderDetails, typeof OrderItems.prototype.id>;

  public readonly sneakers: BelongsToAccessor<Sneakers, typeof OrderItems.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('OrderDetailsRepository') protected orderDetailsRepositoryGetter: Getter<OrderDetailsRepository>, @repository.getter('SneakersRepository') protected sneakersRepositoryGetter: Getter<SneakersRepository>,
  ) {
    super(OrderItems, dataSource);
    this.sneakers = this.createBelongsToAccessorFor('sneakers', sneakersRepositoryGetter,);
    this.registerInclusionResolver('sneakers', this.sneakers.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderDetailsRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
