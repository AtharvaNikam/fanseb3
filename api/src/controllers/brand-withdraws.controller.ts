import {
  Count,
  CountSchema,
  DefaultTransactionalRepository,
  Filter,
  FilterExcludingWhere,
  IsolationLevel,
  repository,
  Where,
} from '@loopback/repository';
import {UserProfile} from '@loopback/security';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {
  BrandBalances,
  BrandWithdraws,
  InfluencerBalances,
  InfluencerWithdraws,
} from '../models';
import {
  BrandBalancesRepository,
  BrandWithdrawsRepository,
  InfluencerBalancesRepository,
  InfluencerWithdrawsRepository,
  UserRepository,
} from '../repositories';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {PermissionKeys} from '../authorization/permission-keys';
import {inject} from '@loopback/core';
import {FansebDataSource} from '../datasources';

export class BrandWithdrawsController {
  constructor(
    @inject('datasources.fanseb')
    public dataSource: FansebDataSource,
    @repository(BrandWithdrawsRepository)
    public brandWithdrawsRepository: BrandWithdrawsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(BrandBalancesRepository)
    public brandBalancesRepository: BrandBalancesRepository,
  ) {}

  // @authenticate({
  //   strategy: 'jwt',
  //   options: {required: [PermissionKeys.BRAND]},
  // })
  @post('/brand-withdraws')
  @response(200, {
    description: 'BrandWithdraws model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(BrandWithdraws)},
    },
  })
  async create(
    @requestBody()
    brandWithdraws: any,
  ): Promise<any> {
    const repo = new DefaultTransactionalRepository(
      BrandWithdraws,
      this.dataSource,
    );
    const tx = await repo.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      let brandalance = await this.brandBalancesRepository.findOne({
        where: {
          brandId: brandWithdraws.brandId,
        },
      });
      if (!brandalance) {
        brandalance = await this.brandBalancesRepository.create(
          {
            currentBalance: 0,
            brandId: brandWithdraws.brandId,
          },
          {transaction: tx},
        );
      }
      if (
        brandalance &&
        brandalance.currentBalance &&
        brandalance.currentBalance < brandWithdraws.amount
      ) {
        throw new HttpErrors[400]('Not Enough Balance');
      }
      const newCurrentBalance = Math.max(
        0,
        Number(brandalance.currentBalance || 0) - Number(brandWithdraws.amount),
      );
      const newTotalWithdrawnAMount = Math.max(
        0,
        Number(brandalance.withdrawnAmount || 0) +
          Number(brandWithdraws.amount),
      );
      await this.brandBalancesRepository.updateById(
        brandalance.id,
        {
          currentBalance: newCurrentBalance,
          withdrawnAmount: newTotalWithdrawnAMount,
        },
        {transaction: tx},
      );
      const inputData: Partial<BrandWithdraws> = {
        amount: brandWithdraws.amount,
        paymentMethod: brandWithdraws.paymentMethod,
        details: brandWithdraws.details,
        note: brandWithdraws.note,
      };
      const withdraw =
        await this.brandWithdrawsRepository.create(brandWithdraws);
      tx.commit();
      return withdraw;
    } catch (err) {
      tx.rollback();
      throw err;
    }
  }

  @get('/brand-withdraws/count')
  @response(200, {
    description: 'BrandWithdraws model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BrandWithdraws) where?: Where<BrandWithdraws>,
  ): Promise<Count> {
    return this.brandWithdrawsRepository.count(where);
  }

  // @authenticate({
  //   strategy: 'jwt',
  //   options: {required: [PermissionKeys.BRAND]},
  // })
  @get('/brand-withdraws/{id}')
  @response(200, {
    description: 'Array of BrandWithdraws model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BrandWithdraws, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.filter(BrandWithdraws) filter?: Filter<BrandWithdraws>,
  ): Promise<BrandWithdraws[]> {
    return this.brandWithdrawsRepository.find({
      ...filter,
      where: {
        brandId: id,
      },
      include: ['brand'],
    });
  }

  @get('/all-brand-withdraws')
  @response(200, {
    description: 'Array of BrandWithdraws model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BrandWithdraws, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async findAllWithdraws(
    @param.filter(BrandWithdraws) filter?: Filter<BrandWithdraws>,
  ): Promise<BrandWithdraws[]> {
    return this.brandWithdrawsRepository.find({
      ...filter,
      include: ['brand'],
    });
  }

  @get('/single-brand-withdraws/{id}')
  @response(200, {
    description: 'BrandWithdraws model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BrandWithdraws, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BrandWithdraws, {exclude: 'where'})
    filter?: FilterExcludingWhere<BrandWithdraws>,
  ): Promise<BrandWithdraws> {
    return this.brandWithdrawsRepository.findById(id, {
      ...filter,
      include: ['brand'],
    });
  }

  @patch('/brand-withdraws/{id}')
  @response(204, {
    description: 'BrandWithdraws PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BrandWithdraws, {partial: true}),
        },
      },
    })
    brandWithdraws: BrandWithdraws,
  ): Promise<void> {
    await this.brandWithdrawsRepository.updateById(id, brandWithdraws);
  }

  @del('/brand-withdraws/{id}')
  @response(204, {
    description: 'BrandWithdraws DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.brandWithdrawsRepository.deleteById(id);
  }
}
