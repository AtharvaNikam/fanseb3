import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {InfluencerBalances, InfluencerBalancesRelations} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';

export class InfluencerBalancesRepository extends TimeStampRepositoryMixin<
  InfluencerBalances,
  typeof InfluencerBalances.prototype.id,
  Constructor<
    DefaultCrudRepository<
      InfluencerBalances,
      typeof InfluencerBalances.prototype.id,
      InfluencerBalancesRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
  ) {
    super(InfluencerBalances, dataSource);
  }
}
