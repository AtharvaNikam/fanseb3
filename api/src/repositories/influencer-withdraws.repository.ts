import {Constructor, inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {InfluencerWithdraws, InfluencerWithdrawsRelations, User} from '../models';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';
import {UserRepository} from './user.repository';

export class InfluencerWithdrawsRepository extends TimeStampRepositoryMixin<
  InfluencerWithdraws,
  typeof InfluencerWithdraws.prototype.id,
  Constructor<
    DefaultCrudRepository<
      InfluencerWithdraws,
      typeof InfluencerWithdraws.prototype.id,
      InfluencerWithdrawsRelations
    >
  >
>(DefaultCrudRepository) {

  public readonly influencer: BelongsToAccessor<User, typeof InfluencerWithdraws.prototype.id>;

  constructor(@inject('datasources.fanseb') dataSource: FansebDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,) {
    super(InfluencerWithdraws, dataSource);
    this.influencer = this.createBelongsToAccessorFor('influencer', userRepositoryGetter,);
    this.registerInclusionResolver('influencer', this.influencer.inclusionResolver);
  }
}
