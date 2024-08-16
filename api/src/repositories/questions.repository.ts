import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Questions, QuestionsRelations, Products, User} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';
import {ProductsRepository} from './products.repository';
import {UserRepository} from './user.repository';

export class QuestionsRepository extends TimeStampRepositoryMixin<
  Questions,
  typeof Questions.prototype.id,
  Constructor<
    DefaultCrudRepository<Questions, typeof Questions.prototype.id, QuestionsRelations>
  >
>(DefaultCrudRepository) {

  public readonly products: BelongsToAccessor<Products, typeof Questions.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Questions.prototype.id>;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Questions, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.products = this.createBelongsToAccessorFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
