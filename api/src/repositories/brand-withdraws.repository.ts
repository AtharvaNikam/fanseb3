import {inject, Getter, Constructor} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {FansebDataSource} from '../datasources';
import {BrandWithdraws, BrandWithdrawsRelations, Brand} from '../models';
import {BrandRepository} from './brand.repository';
import {TimeStampRepositoryMixin} from '../mixins/timestamp-repository-mixin';

export class BrandWithdrawsRepository extends TimeStampRepositoryMixin<
  BrandWithdraws,
  typeof BrandWithdraws.prototype.id,
  Constructor<
    DefaultCrudRepository<
      BrandWithdraws,
      typeof BrandWithdraws.prototype.id,
      BrandWithdrawsRelations
    >
  >
>(DefaultCrudRepository) {
  public readonly brand: BelongsToAccessor<
    Brand,
    typeof BrandWithdraws.prototype.id
  >;

  constructor(
    @inject('datasources.fanseb') dataSource: FansebDataSource,
    @repository.getter('BrandRepository')
    protected brandRepositoryGetter: Getter<BrandRepository>,
  ) {
    super(BrandWithdraws, dataSource);
    this.brand = this.createBelongsToAccessorFor(
      'brand',
      brandRepositoryGetter,
    );
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
  }
}
