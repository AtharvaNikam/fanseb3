import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {BrandBalances, BrandBalancesRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class BrandBalancesRepository extends TimeStampRepositoryMixin<
  BrandBalances,
  typeof BrandBalances.prototype.id,
  Constructor<
    DefaultCrudRepository<
      BrandBalances,
      typeof BrandBalances.prototype.id,
      BrandBalancesRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource) {
    super(BrandBalances, dataSource);
  }
}
