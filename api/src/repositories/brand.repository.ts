import {Constructor, Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {Brand, BrandRelations, User, BrandBalances, Products, Orders} from '../models';
import {UserRepository} from './user.repository';
import {BrandBalancesRepository} from './brand-balances.repository';
import {ProductsRepository} from './products.repository';
import {OrdersRepository} from './orders.repository';

export class BrandRepository extends TimeStampRepositoryMixin<
  Brand,
  typeof Brand.prototype.id,
  Constructor<
    DefaultCrudRepository<Brand, typeof Brand.prototype.id, BrandRelations>
  >
>(DefaultCrudRepository) {
  public readonly user: BelongsToAccessor<User, typeof Brand.prototype.id>;

  public readonly brandBalances: HasOneRepositoryFactory<BrandBalances, typeof Brand.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Products, typeof Brand.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof Brand.prototype.id>;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('BrandBalancesRepository') protected brandBalancesRepositoryGetter: Getter<BrandBalancesRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(Brand, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.products = this.createHasManyRepositoryFactoryFor('products', productsRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.brandBalances = this.createHasOneRepositoryFactoryFor('brandBalances', brandBalancesRepositoryGetter);
    this.registerInclusionResolver('brandBalances', this.brandBalances.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
