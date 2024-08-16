import {Constructor, Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {Products, User, Wishlist, WishlistRelations} from '../models';
import {ProductsRepository} from './products.repository';
import {UserRepository} from './user.repository';

export class WishlistRepository extends TimeStampRepositoryMixin<
  Wishlist,
  typeof Wishlist.prototype.id,
  Constructor<
    DefaultCrudRepository<
      Wishlist,
      typeof Wishlist.prototype.id,
      WishlistRelations
    >
  >
>(DefaultCrudRepository) {
  public readonly products: BelongsToAccessor<
    Products,
    typeof Wishlist.prototype.id
  >;

  public readonly user: BelongsToAccessor<User, typeof Wishlist.prototype.id>;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
    @repository.getter('ProductsRepository')
    protected productsRepositoryGetter: Getter<ProductsRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Wishlist, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.products = this.createBelongsToAccessorFor(
      'products',
      productsRepositoryGetter,
    );
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
