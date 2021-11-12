import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {ShoppingSession, ShoppingSessionRelations, User, CartItem} from '../models';
import {UserRepository} from './user.repository';
import {CartItemRepository} from './cart-item.repository';

export class ShoppingSessionRepository extends DefaultCrudRepository<
  ShoppingSession,
  typeof ShoppingSession.prototype.id,
  ShoppingSessionRelations
> {

  public readonly user: BelongsToAccessor<User, typeof ShoppingSession.prototype.id>;

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof ShoppingSession.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(ShoppingSession, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
