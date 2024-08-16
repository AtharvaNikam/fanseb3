import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {ReelProducts, ReelProductsRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class ReelProductsRepository extends TimeStampRepositoryMixin<
  ReelProducts,
  typeof ReelProducts.prototype.id,
  Constructor<
    DefaultCrudRepository<
      ReelProducts,
      typeof ReelProducts.prototype.id,
      ReelProductsRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource) {
    super(ReelProducts, dataSource);
  }
}
