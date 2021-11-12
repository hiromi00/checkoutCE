import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {OrderDetails, OrderDetailsRelations, User, OrderItems} from '../models';
import {UserRepository} from './user.repository';
import {OrderItemsRepository} from './order-items.repository';

export class OrderDetailsRepository extends DefaultCrudRepository<
  OrderDetails,
  typeof OrderDetails.prototype.id,
  OrderDetailsRelations
> {

  public readonly user: BelongsToAccessor<User, typeof OrderDetails.prototype.id>;

  public readonly orderItems: HasManyRepositoryFactory<OrderItems, typeof OrderDetails.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrderItemsRepository') protected orderItemsRepositoryGetter: Getter<OrderItemsRepository>,
  ) {
    super(OrderDetails, dataSource);
    this.orderItems = this.createHasManyRepositoryFactoryFor('orderItems', orderItemsRepositoryGetter,);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
