import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
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
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {PermissionKeys} from '../authorization/permission-keys';
import {FansebDataSource} from '../datasources';
import {InfluencerWithdraws} from '../models';
import {
  InfluencerBalancesRepository,
  InfluencerWithdrawsRepository,
  UserRepository,
} from '../repositories';

export class InfluencerWithdrawsController {
  constructor(
    @inject('datasources.fanseb')
    public dataSource: FansebDataSource,
    @repository(InfluencerWithdrawsRepository)
    public influencerWithdrawsRepository: InfluencerWithdrawsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(InfluencerBalancesRepository)
    public influencerBalancesRepository: InfluencerBalancesRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @post('/influencer-withdraws')
  @response(200, {
    description: 'InfluencerWithdraws model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(InfluencerWithdraws)},
    },
  })
  async create(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfluencerWithdraws, {
            title: 'NewInfluencerWithdraws',
            exclude: ['id'],
          }),
        },
      },
    })
    influencerWithdraws: Omit<InfluencerWithdraws, 'id'>,
  ): Promise<any> {
    const repo = new DefaultTransactionalRepository(
      InfluencerWithdraws,
      this.dataSource,
    );
    const tx = await repo.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      let influencerBalance = await this.influencerBalancesRepository.findOne({
        where: {
          influencerId: currnetUser.id,
        },
      });
      if (!influencerBalance) {
        influencerBalance = await this.userRepository
          .influencerBalances(currnetUser.id)
          .create(
            {
              currentBalance: 0,
            },
            {transaction: tx},
          );
      }
      if (
        influencerBalance &&
        influencerBalance.currentBalance &&
        influencerBalance.currentBalance < influencerWithdraws.amount
      ) {
        throw new HttpErrors[400]('Not Enough Balance');
      }
      const newCurrentBalance = Math.max(
        0,
        Number(influencerBalance.currentBalance || 0) -
          Number(influencerWithdraws.amount),
      );
      const newTotalWithdrawnAMount = Math.max(
        0,
        Number(influencerBalance.withdrawnAmount || 0) +
          Number(influencerWithdraws.amount),
      );
      await this.influencerBalancesRepository.updateById(
        influencerBalance.id,
        {
          currentBalance: newCurrentBalance,
          withdrawnAmount: newTotalWithdrawnAMount,
        },
        {transaction: tx},
      );
      const withdraw = await this.userRepository
        .influencerWithdraws(currnetUser.id)
        .create(influencerWithdraws);
      tx.commit();
      return withdraw;
    } catch (err) {
      tx.rollback();
      throw err;
    }
  }

  @get('/influencer-withdraws/count')
  @response(200, {
    description: 'InfluencerWithdraws model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InfluencerWithdraws) where?: Where<InfluencerWithdraws>,
  ): Promise<Count> {
    return this.influencerWithdrawsRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @get('/influencer-withdraws')
  @response(200, {
    description: 'Array of InfluencerWithdraws model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InfluencerWithdraws, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.filter(InfluencerWithdraws) filter?: Filter<InfluencerWithdraws>,
  ): Promise<InfluencerWithdraws[]> {
    return this.influencerWithdrawsRepository.find({
      ...filter,
      where: {
        influencerId: currnetUser.id,
      },
      include: ['influencer'],
    });
  }
  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/all-influencer-withdraws')
  @response(200, {
    description: 'Array of InfluencerWithdraws model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InfluencerWithdraws, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async findInfluencers(
    @param.filter(InfluencerWithdraws) filter?: Filter<InfluencerWithdraws>,
  ): Promise<InfluencerWithdraws[]> {
    return this.influencerWithdrawsRepository.find({
      ...filter,
      include: ['influencer'],
    });
  }

  @patch('/influencer-withdraws')
  @response(200, {
    description: 'InfluencerWithdraws PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfluencerWithdraws, {partial: true}),
        },
      },
    })
    influencerWithdraws: InfluencerWithdraws,
    @param.where(InfluencerWithdraws) where?: Where<InfluencerWithdraws>,
  ): Promise<Count> {
    return this.influencerWithdrawsRepository.updateAll(
      influencerWithdraws,
      where,
    );
  }

  @get('/influencer-withdraws/{id}')
  @response(200, {
    description: 'InfluencerWithdraws model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InfluencerWithdraws, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InfluencerWithdraws, {exclude: 'where'})
    filter?: FilterExcludingWhere<InfluencerWithdraws>,
  ): Promise<InfluencerWithdraws> {
    return this.influencerWithdrawsRepository.findById(id, filter);
  }

  @patch('/influencer-withdraws/{id}')
  @response(204, {
    description: 'InfluencerWithdraws PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfluencerWithdraws, {partial: true}),
        },
      },
    })
    influencerWithdraws: InfluencerWithdraws,
  ): Promise<void> {
    await this.influencerWithdrawsRepository.updateById(
      id,
      influencerWithdraws,
    );
  }

  @put('/influencer-withdraws/{id}')
  @response(204, {
    description: 'InfluencerWithdraws PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() influencerWithdraws: InfluencerWithdraws,
  ): Promise<void> {
    await this.influencerWithdrawsRepository.replaceById(
      id,
      influencerWithdraws,
    );
  }

  @del('/influencer-withdraws/{id}')
  @response(204, {
    description: 'InfluencerWithdraws DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.influencerWithdrawsRepository.deleteById(id);
  }
}
