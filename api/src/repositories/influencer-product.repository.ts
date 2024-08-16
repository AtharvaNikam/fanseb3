import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {InfluencerProduct, InfluencerProductRelations, User, Products} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {UserRepository} from './user.repository';
import {ProductsRepository} from './products.repository';

export class InfluencerProductRepository extends TimeStampRepositoryMixin<
  InfluencerProduct,
  typeof InfluencerProduct.prototype.id,
  Constructor<
    DefaultCrudRepository<
      InfluencerProduct,
      typeof InfluencerProduct.prototype.id,
      InfluencerProductRelations
    >
  >
>(DefaultCrudRepository) {

  public readonly user: BelongsToAccessor<User, typeof InfluencerProduct.prototype.id>;

  public readonly products: BelongsToAccessor<Products, typeof InfluencerProduct.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,) {
    super(InfluencerProduct, dataSource);
    this.products = this.createBelongsToAccessorFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
