import {authenticate} from '@loopback/authentication';
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
import {PermissionKeys} from '../authorization/permission-keys';
import {OrderStatus} from '../models';
import {OrderStatusRepository} from '../repositories';

export class OrderStatusController {
  constructor(
    @repository(OrderStatusRepository)
    public orderStatusRepository: OrderStatusRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @post('/order-statuses')
  @response(200, {
    description: 'OrderStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderStatus, {
            title: 'NewOrderStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    orderStatus: Omit<OrderStatus, 'id'>,
  ): Promise<OrderStatus> {
    return this.orderStatusRepository.create(orderStatus);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/order-statuses/count')
  @response(200, {
    description: 'OrderStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderStatus) where?: Where<OrderStatus>,
  ): Promise<Count> {
    return this.orderStatusRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.CUSTOMER,
      ],
    },
  })
  @get('/order-statuses')
  @response(200, {
    description: 'Array of OrderStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderStatus) filter?: Filter<OrderStatus>,
  ): Promise<OrderStatus[]> {
    return this.orderStatusRepository.find(filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/order-statuses')
  @response(200, {
    description: 'OrderStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderStatus, {partial: true}),
        },
      },
    })
    orderStatus: OrderStatus,
    @param.where(OrderStatus) where?: Where<OrderStatus>,
  ): Promise<Count> {
    return this.orderStatusRepository.updateAll(orderStatus, where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/order-statuses/{id}')
  @response(200, {
    description: 'OrderStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrderStatus, {exclude: 'where'})
    filter?: FilterExcludingWhere<OrderStatus>,
  ): Promise<OrderStatus> {
    return this.orderStatusRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/order-statuses/{id}')
  @response(204, {
    description: 'OrderStatus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderStatus, {partial: true}),
        },
      },
    })
    orderStatus: OrderStatus,
  ): Promise<void> {
    await this.orderStatusRepository.updateById(id, orderStatus);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @put('/order-statuses/{id}')
  @response(204, {
    description: 'OrderStatus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderStatus: OrderStatus,
  ): Promise<void> {
    await this.orderStatusRepository.replaceById(id, orderStatus);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @del('/order-statuses/{id}')
  @response(204, {
    description: 'OrderStatus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderStatusRepository.deleteById(id);
  }
}
