import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Products, ProductsRelations, Brand, Reviews, Questions} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {BrandRepository} from './brand.repository';
import {ReviewsRepository} from './reviews.repository';
import {QuestionsRepository} from './questions.repository';

export class ProductsRepository extends TimeStampRepositoryMixin<
  Products,
  typeof Products.prototype.id,
  Constructor<
    DefaultCrudRepository<
      Products,
      typeof Products.prototype.id,
      ProductsRelations
    >
  >
>(DefaultCrudRepository) {

  public readonly brand: BelongsToAccessor<Brand, typeof Products.prototype.id>;

  public readonly reviews: HasManyRepositoryFactory<Reviews, typeof Products.prototype.id>;

  public readonly questions: HasManyRepositoryFactory<Questions, typeof Products.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('ReviewsRepository') protected reviewsRepositoryGetter: Getter<ReviewsRepository>, @repository.getter('QuestionsRepository') protected questionsRepositoryGetter: Getter<QuestionsRepository>,) {
    super(Products, dataSource);
    this.questions = this.createHasManyRepositoryFactoryFor('questions', questionsRepositoryGetter,);
    this.registerInclusionResolver('questions', this.questions.inclusionResolver);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewsRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
  }
}
