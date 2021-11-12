import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {Sneakers, SneakersRelations, Sizes, SneakersSizes, CartItem, OrderItems} from '../models';
import {SneakersSizesRepository} from './sneakers-sizes.repository';
import {SizesRepository} from './sizes.repository';
import {CartItemRepository} from './cart-item.repository';
import {OrderItemsRepository} from './order-items.repository';

export class SneakersRepository extends DefaultCrudRepository<
  Sneakers,
  typeof Sneakers.prototype.id,
  SneakersRelations
> {

  public readonly sizes: HasManyThroughRepositoryFactory<Sizes, typeof Sizes.prototype.id,
          SneakersSizes,
          typeof Sneakers.prototype.id
        >;

  public readonly cartItem: HasOneRepositoryFactory<CartItem, typeof Sneakers.prototype.id>;

  public readonly orderItems: HasOneRepositoryFactory<OrderItems, typeof Sneakers.prototype.id>;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, 
    @repository.getter('SneakersSizesRepository') protected sneakersSizesRepositoryGetter: Getter<SneakersSizesRepository>, 
    @repository.getter('SizesRepository') protected sizesRepositoryGetter: Getter<SizesRepository>, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>, @repository.getter('OrderItemsRepository') protected orderItemsRepositoryGetter: Getter<OrderItemsRepository>,
  ) {
    super(Sneakers, dataSource);
    this.orderItems = this.createHasOneRepositoryFactoryFor('orderItems', orderItemsRepositoryGetter);
    this.registerInclusionResolver('orderItems', this.orderItems.inclusionResolver);
    this.cartItem = this.createHasOneRepositoryFactoryFor('cartItem', cartItemRepositoryGetter);
    this.registerInclusionResolver('cartItem', this.cartItem.inclusionResolver);
    this.sizes = this.createHasManyThroughRepositoryFactoryFor('sizes', sizesRepositoryGetter, sneakersSizesRepositoryGetter,);
    this.registerInclusionResolver('sizes', this.sizes.inclusionResolver);
  }
}
