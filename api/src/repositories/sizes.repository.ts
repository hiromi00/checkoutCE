import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {Sizes, SizesRelations, CartItem} from '../models';
import {CartItemRepository} from './cart-item.repository';

export class SizesRepository extends DefaultCrudRepository<
  Sizes,
  typeof Sizes.prototype.id,
  SizesRelations
> {

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Sizes.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Sizes, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
  }
}
