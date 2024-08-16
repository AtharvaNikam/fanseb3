import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {OrderItems, OrderItemsRelations} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class OrderItemsRepository extends TimeStampRepositoryMixin<
  OrderItems,
  typeof OrderItems.prototype.id,
  Constructor<
    DefaultCrudRepository<
      OrderItems,
      typeof OrderItems.prototype.id,
      OrderItemsRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource) {
    super(OrderItems, dataSource);
  }

  generateTrackingId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
