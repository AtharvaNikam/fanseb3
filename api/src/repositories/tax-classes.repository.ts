import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {TaxClasses, TaxClassesRelations} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';

export class TaxClassesRepository extends TimeStampRepositoryMixin<
  TaxClasses,
  typeof TaxClasses.prototype.id,
  Constructor<
    DefaultCrudRepository<
      TaxClasses,
      typeof TaxClasses.prototype.id,
      TaxClassesRelations
    >
  >
>(DefaultCrudRepository) {

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
  ) {
    super(TaxClasses, dataSource);
  }
}
