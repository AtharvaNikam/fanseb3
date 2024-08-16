import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Reels, ReelsRelations, User, Products, ReelProducts} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {UserRepository} from './user.repository';
import {ReelProductsRepository} from './reel-products.repository';
import {ProductsRepository} from './products.repository';

export class ReelsRepository extends TimeStampRepositoryMixin<
  Reels,
  typeof Reels.prototype.id,
  Constructor<
    DefaultCrudRepository<Reels, typeof Reels.prototype.id, ReelsRelations>
  >
>(DefaultCrudRepository) {

  public readonly user: BelongsToAccessor<User, typeof Reels.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Products, typeof Products.prototype.id,
          ReelProducts,
          typeof Reels.prototype.id
        >;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ReelProductsRepository') protected reelProductsRepositoryGetter: Getter<ReelProductsRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,) {
    super(Reels, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productsRepositoryGetter, reelProductsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
