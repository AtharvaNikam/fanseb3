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
import {ShippingClasses} from '../models';
import {ShippingClassesRepository} from '../repositories';

export class ShippingClassesController {
  constructor(
    @repository(ShippingClassesRepository)
    public ShippingClassesRepository: ShippingClassesRepository,
  ) {}

  @post('/shipping-classes')
  @response(200, {
    description: 'ShippingClasses model instance',
    content: {'application/json': {schema: getModelSchemaRef(ShippingClasses)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShippingClasses, {
            title: 'NewShippingClasses',
            exclude: ['id'],
          }),
        },
      },
    })
    ShippingClasses: Omit<ShippingClasses, 'id'>,
  ): Promise<ShippingClasses> {
    return this.ShippingClassesRepository.create(ShippingClasses);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/shipping-classes/count')
  @response(200, {
    description: 'ShippingClasses model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ShippingClasses) where?: Where<ShippingClasses>,
  ): Promise<Count> {
    return this.ShippingClassesRepository.count(where);
  }

  @get('/shipping-classes')
  @response(200, {
    description: 'Array of ShippingClasses model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ShippingClasses, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ShippingClasses) filter?: Filter<ShippingClasses>,
  ): Promise<ShippingClasses[]> {
    return this.ShippingClassesRepository.find(filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/shipping-classes')
  @response(200, {
    description: 'ShippingClasses PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShippingClasses, {partial: true}),
        },
      },
    })
    ShippingClasses: ShippingClasses,
    @param.where(ShippingClasses) where?: Where<ShippingClasses>,
  ): Promise<Count> {
    return this.ShippingClassesRepository.updateAll(ShippingClasses, where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/shipping-classes/{id}')
  @response(200, {
    description: 'ShippingClasses model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ShippingClasses, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ShippingClasses, {exclude: 'where'})
    filter?: FilterExcludingWhere<ShippingClasses>,
  ): Promise<ShippingClasses> {
    return this.ShippingClassesRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/shipping-classes/{id}')
  @response(204, {
    description: 'ShippingClasses PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShippingClasses, {partial: true}),
        },
      },
    })
    ShippingClasses: ShippingClasses,
  ): Promise<void> {
    await this.ShippingClassesRepository.updateById(id, ShippingClasses);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @put('/shipping-classes/{id}')
  @response(204, {
    description: 'ShippingClasses PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ShippingClasses: ShippingClasses,
  ): Promise<void> {
    await this.ShippingClassesRepository.replaceById(id, ShippingClasses);
  }

  @del('/shipping-classes/{id}')
  @response(204, {
    description: 'ShippingClasses DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ShippingClassesRepository.deleteById(id);
  }
}
