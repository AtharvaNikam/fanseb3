import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Refunds, RefundsRelations, Orders, User} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {OrdersRepository} from './orders.repository';
import {UserRepository} from './user.repository';

export class RefundsRepository extends TimeStampRepositoryMixin<
  Refunds,
  typeof Refunds.prototype.id,
  Constructor<
    DefaultCrudRepository<
      Refunds,
      typeof Refunds.prototype.id,
      RefundsRelations
    >
  >
>(DefaultCrudRepository) {

  public readonly orders: BelongsToAccessor<Orders, typeof Refunds.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Refunds.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,) {
    super(Refunds, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
