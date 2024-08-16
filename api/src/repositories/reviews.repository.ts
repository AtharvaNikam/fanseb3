import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Reviews, ReviewsRelations, Products} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';
import {ProductsRepository} from './products.repository';

export class ReviewsRepository extends TimeStampRepositoryMixin<
  Reviews,
  typeof Reviews.prototype.id,
  Constructor<
    DefaultCrudRepository<Reviews, typeof Reviews.prototype.id, ReviewsRelations>
  >
>(DefaultCrudRepository) {

  public readonly products: BelongsToAccessor<Products, typeof Reviews.prototype.id>;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,
  ) {
    super(Reviews, dataSource);
    this.products = this.createBelongsToAccessorFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
