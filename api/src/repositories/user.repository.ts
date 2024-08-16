import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {User, UserRelations, UserProfile, Brand, Reels, InfluencerBalances, Products, InfluencerProduct, InfluencerWithdraws, Orders, Refunds, Questions} from '../models';
import { TimeStampRepositoryMixin } from '../mixins/timestamp-repository-mixin';
import {UserProfileRepository} from './user-profile.repository';
import {BrandRepository} from './brand.repository';
import {ReelsRepository} from './reels.repository';
import {InfluencerBalancesRepository} from './influencer-balances.repository';
import {InfluencerProductRepository} from './influencer-product.repository';
import {ProductsRepository} from './products.repository';
import {InfluencerWithdrawsRepository} from './influencer-withdraws.repository';
import {OrdersRepository} from './orders.repository';
import {RefundsRepository} from './refunds.repository';
import {QuestionsRepository} from './questions.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends TimeStampRepositoryMixin<
  User,
  typeof User.prototype.id,
  Constructor<
    DefaultCrudRepository<User, typeof User.prototype.id, UserRelations>
  >
>(DefaultCrudRepository) {

  public readonly userProfile: HasOneRepositoryFactory<UserProfile, typeof User.prototype.id>;

  public readonly brands: HasManyRepositoryFactory<Brand, typeof User.prototype.id>;

  public readonly reels: HasManyRepositoryFactory<Reels, typeof User.prototype.id>;

  public readonly influencerBalances: HasOneRepositoryFactory<InfluencerBalances, typeof User.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Products, typeof Products.prototype.id,
          InfluencerProduct,
          typeof User.prototype.id
        >;

  public readonly influencerWithdraws: HasManyRepositoryFactory<InfluencerWithdraws, typeof User.prototype.id>;

  public readonly orders: HasManyRepositoryFactory<Orders, typeof User.prototype.id>;

  public readonly refunds: HasManyRepositoryFactory<Refunds, typeof User.prototype.id>;

  public readonly questions: HasManyRepositoryFactory<Questions, typeof User.prototype.id>;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('UserProfileRepository') protected userProfileRepositoryGetter: Getter<UserProfileRepository>, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('ReelsRepository') protected reelsRepositoryGetter: Getter<ReelsRepository>, @repository.getter('InfluencerBalancesRepository') protected influencerBalancesRepositoryGetter: Getter<InfluencerBalancesRepository>, @repository.getter('InfluencerProductRepository') protected influencerProductRepositoryGetter: Getter<InfluencerProductRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>, @repository.getter('InfluencerWithdrawsRepository') protected influencerWithdrawsRepositoryGetter: Getter<InfluencerWithdrawsRepository>, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('RefundsRepository') protected refundsRepositoryGetter: Getter<RefundsRepository>, @repository.getter('QuestionsRepository') protected questionsRepositoryGetter: Getter<QuestionsRepository>,
  ) {
    super(User, dataSource);
    this.questions = this.createHasManyRepositoryFactoryFor('questions', questionsRepositoryGetter,);
    this.registerInclusionResolver('questions', this.questions.inclusionResolver);
    this.refunds = this.createHasManyRepositoryFactoryFor('refunds', refundsRepositoryGetter,);
    this.registerInclusionResolver('refunds', this.refunds.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
    this.influencerWithdraws = this.createHasManyRepositoryFactoryFor('influencerWithdraws', influencerWithdrawsRepositoryGetter,);
    this.registerInclusionResolver('influencerWithdraws', this.influencerWithdraws.inclusionResolver);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productsRepositoryGetter, influencerProductRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.influencerBalances = this.createHasOneRepositoryFactoryFor('influencerBalances', influencerBalancesRepositoryGetter);
    this.registerInclusionResolver('influencerBalances', this.influencerBalances.inclusionResolver);
    this.reels = this.createHasManyRepositoryFactoryFor('reels', reelsRepositoryGetter,);
    this.registerInclusionResolver('reels', this.reels.inclusionResolver);
    this.brands = this.createHasManyRepositoryFactoryFor('brands', brandRepositoryGetter,);
    this.registerInclusionResolver('brands', this.brands.inclusionResolver);
    this.userProfile = this.createHasOneRepositoryFactoryFor('userProfile', userProfileRepositoryGetter);
    this.registerInclusionResolver('userProfile', this.userProfile.inclusionResolver);
  }
}
