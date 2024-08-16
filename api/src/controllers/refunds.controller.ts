import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Refunds} from '../models';
import {RefundsRepository} from '../repositories';

export class RefundsController {
  constructor(
    @repository(RefundsRepository)
    public refundsRepository: RefundsRepository,
  ) {}

  @post('/refunds')
  @response(200, {
    description: 'Refunds model instance',
    content: {'application/json': {schema: getModelSchemaRef(Refunds)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refunds, {
            title: 'NewRefunds',
            exclude: ['id'],
          }),
        },
      },
    })
    refunds: Omit<Refunds, 'id'>,
  ): Promise<Refunds> {
    return this.refundsRepository.create(refunds);
  }

  @get('/refunds/count')
  @response(200, {
    description: 'Refunds model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Refunds) where?: Where<Refunds>): Promise<Count> {
    return this.refundsRepository.count(where);
  }

  @get('/refunds')
  @response(200, {
    description: 'Array of Refunds model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Refunds, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Refunds) filter?: Filter<Refunds>,
  ): Promise<Refunds[]> {
    return this.refundsRepository.find({
      ...filter,
      include: ['orders', 'user'],
    });
  }

  @patch('/refunds')
  @response(200, {
    description: 'Refunds PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refunds, {partial: true}),
        },
      },
    })
    refunds: Refunds,
    @param.where(Refunds) where?: Where<Refunds>,
  ): Promise<Count> {
    return this.refundsRepository.updateAll(refunds, where);
  }

  @get('/refunds/{id}')
  @response(200, {
    description: 'Refunds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Refunds, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Refunds, {exclude: 'where'})
    filter?: FilterExcludingWhere<Refunds>,
  ): Promise<Refunds> {
    let includeFilter = filter?.include;
    if (!includeFilter) {
      includeFilter = [];
    }
    includeFilter.push(
      {
        relation: 'orders',
        scope: {
          include: [{relation: 'products'}],
        },
      },
      {relation: 'user'},
    );
    return this.refundsRepository.findById(id, {
      ...filter,
      include: includeFilter,
    });
  }

  @patch('/refunds/{id}')
  @response(204, {
    description: 'Refunds PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refunds, {partial: true}),
        },
      },
    })
    refunds: Refunds,
  ): Promise<void> {
    await this.refundsRepository.updateById(id, refunds);
  }

  @put('/refunds/{id}')
  @response(204, {
    description: 'Refunds PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() refunds: Refunds,
  ): Promise<void> {
    await this.refundsRepository.replaceById(id, refunds);
  }

  @del('/refunds/{id}')
  @response(204, {
    description: 'Refunds DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.refundsRepository.deleteById(id);
  }

  @get('/user/{userId}/refunds')
  @response(200, {
    description: 'Refunds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Refunds, {includeRelations: true}),
      },
    },
  })
  async getUserRefunds(
    @param.path.number('userId') userId: number,
    @param.filter(Refunds)
    filter?: FilterExcludingWhere<Refunds>,
  ): Promise<Refunds[]> {
    let includeFilter = filter?.include;
    if (!includeFilter) {
      includeFilter = [];
    }
    includeFilter.push({relation: 'orders'});
    return this.refundsRepository.find({
      where: {
        userId: userId,
      },
      ...filter,
      include: includeFilter,
    });
  }
}
