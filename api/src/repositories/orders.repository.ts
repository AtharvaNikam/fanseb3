import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {Orders, OrdersRelations, User, Brand, Products, OrderItems, Refunds} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {UserRepository} from './user.repository';
import {BrandRepository} from './brand.repository';
import {OrderItemsRepository} from './order-items.repository';
import {ProductsRepository} from './products.repository';
import {RefundsRepository} from './refunds.repository';

export class OrdersRepository extends TimeStampRepositoryMixin<
  Orders,
  typeof Orders.prototype.id,
  Constructor<
    DefaultCrudRepository<Orders, typeof Orders.prototype.id, OrdersRelations>
  >
>(DefaultCrudRepository) {

  public readonly user: BelongsToAccessor<User, typeof Orders.prototype.id>;

  public readonly brand: BelongsToAccessor<Brand, typeof Orders.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Products, typeof Products.prototype.id,
          OrderItems,
          typeof Orders.prototype.id
        >;

  public readonly refunds: HasOneRepositoryFactory<Refunds, typeof Orders.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('OrderItemsRepository') protected orderItemsRepositoryGetter: Getter<OrderItemsRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('RefundsRepository') protected refundsRepositoryGetter: Getter<RefundsRepository>,) {
    super(Orders, dataSource);
    this.refunds = this.createHasOneRepositoryFactoryFor('refunds', refundsRepositoryGetter);
    this.registerInclusionResolver('refunds', this.refunds.inclusionResolver);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productsRepositoryGetter, orderItemsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

  async getTotalOfAllOrders(): Promise<number> {
    const result = await this.dataSource.execute('SELECT SUM(total) AS total FROM orders');
    return result[0].total || 0;
  }

  async getTotalOfTodayOrders(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await this.dataSource.execute('SELECT SUM(total) AS total FROM orders WHERE createdAt >= ? AND createdAt < ?', [today, new Date(today.getTime() + 24 * 60 * 60 * 1000)]);
    return result[0].total || 0;
  }
}
