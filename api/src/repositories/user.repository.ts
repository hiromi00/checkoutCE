import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {User, UserRelations, ShoppingSession, OrderDetails} from '../models';
import {ShoppingSessionRepository} from './shopping-session.repository';
import {OrderDetailsRepository} from './order-details.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly shoppingSession: HasOneRepositoryFactory<ShoppingSession, typeof User.prototype.id>;

  public readonly orderDetails: HasOneRepositoryFactory<OrderDetails, typeof User.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('ShoppingSessionRepository') protected shoppingSessionRepositoryGetter: Getter<ShoppingSessionRepository>, @repository.getter('OrderDetailsRepository') protected orderDetailsRepositoryGetter: Getter<OrderDetailsRepository>,
  ) {
    super(User, dataSource);
    this.orderDetails = this.createHasOneRepositoryFactoryFor('orderDetails', orderDetailsRepositoryGetter);
    this.registerInclusionResolver('orderDetails', this.orderDetails.inclusionResolver);
    this.shoppingSession = this.createHasOneRepositoryFactoryFor('shoppingSession', shoppingSessionRepositoryGetter);
    this.registerInclusionResolver('shoppingSession', this.shoppingSession.inclusionResolver);
  }
}
