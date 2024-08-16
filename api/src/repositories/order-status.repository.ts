import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {OrderStatus, OrderStatusRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class OrderStatusRepository extends TimeStampRepositoryMixin<
  OrderStatus,
  typeof OrderStatus.prototype.id,
  Constructor<
    DefaultCrudRepository<
      OrderStatus,
      typeof OrderStatus.prototype.id,
      OrderStatusRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource) {
    super(OrderStatus, dataSource);
  }
}
