import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {CartItem, CartItemRelations, ShoppingSession, Sneakers, Sizes} from '../models';
import {ShoppingSessionRepository} from './shopping-session.repository';
import {SneakersRepository} from './sneakers.repository';
import {SizesRepository} from './sizes.repository';

export class CartItemRepository extends DefaultCrudRepository<
  CartItem,
  typeof CartItem.prototype.id,
  CartItemRelations
> {

  public readonly session: BelongsToAccessor<ShoppingSession, typeof CartItem.prototype.id>;

  public readonly sneakers: BelongsToAccessor<Sneakers, typeof CartItem.prototype.id>;

  public readonly size: BelongsToAccessor<Sizes, typeof CartItem.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, @repository.getter('ShoppingSessionRepository') protected shoppingSessionRepositoryGetter: Getter<ShoppingSessionRepository>, @repository.getter('SneakersRepository') protected sneakersRepositoryGetter: Getter<SneakersRepository>, @repository.getter('SizesRepository') protected sizesRepositoryGetter: Getter<SizesRepository>,
  ) {
    super(CartItem, dataSource);
    this.size = this.createBelongsToAccessorFor('size', sizesRepositoryGetter,);
    this.registerInclusionResolver('size', this.size.inclusionResolver);
    this.sneakers = this.createBelongsToAccessorFor('sneakers', sneakersRepositoryGetter,);
    this.registerInclusionResolver('sneakers', this.sneakers.inclusionResolver);
    this.session = this.createBelongsToAccessorFor('session', shoppingSessionRepositoryGetter,);
    this.registerInclusionResolver('session', this.session.inclusionResolver);
  }
}
