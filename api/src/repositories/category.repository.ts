import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class CategoryRepository extends TimeStampRepositoryMixin<
  Category,
  typeof Category.prototype.id,
  Constructor<
    DefaultCrudRepository<
      Category,
      typeof Category.prototype.id,
      CategoryRelations
    >
  >
>(DefaultCrudRepository) {

  public readonly category: BelongsToAccessor<Category, typeof Category.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,) {
    super(Category, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
