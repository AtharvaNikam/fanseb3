import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {ShippingClasses, ShippingClassesRelations} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';

export class ShippingClassesRepository extends TimeStampRepositoryMixin<
  ShippingClasses,
  typeof ShippingClasses.prototype.id,
  Constructor<
    DefaultCrudRepository<
      ShippingClasses,
      typeof ShippingClasses.prototype.id,
      ShippingClassesRelations
    >
  >
>(DefaultCrudRepository) {

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
  ) {
    super(ShippingClasses, dataSource);
  }
}
