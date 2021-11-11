import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {CheckoutceDataSource} from '../datasources';
import {Sneakers, SneakersRelations, Sizes, SneakersSizes} from '../models';
import {SneakersSizesRepository} from './sneakers-sizes.repository';
import {SizesRepository} from './sizes.repository';

export class SneakersRepository extends DefaultCrudRepository<
  Sneakers,
  typeof Sneakers.prototype.id,
  SneakersRelations
> {

  public readonly sizes: HasManyThroughRepositoryFactory<Sizes, typeof Sizes.prototype.id,
          SneakersSizes,
          typeof Sneakers.prototype.id
        >;

  constructor(
    @inject('datasources.checkoutce') dataSource: CheckoutceDataSource, 
    @repository.getter('SneakersSizesRepository') protected sneakersSizesRepositoryGetter: Getter<SneakersSizesRepository>, 
    @repository.getter('SizesRepository') protected sizesRepositoryGetter: Getter<SizesRepository>,
  ) {
    super(Sneakers, dataSource);
    this.sizes = this.createHasManyThroughRepositoryFactoryFor('sizes', sizesRepositoryGetter, sneakersSizesRepositoryGetter,);
    this.registerInclusionResolver('sizes', this.sizes.inclusionResolver);
  }
}
