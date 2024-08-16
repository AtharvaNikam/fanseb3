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
import {TaxClasses} from '../models';
import {TaxClassesRepository} from '../repositories';

export class TaxController {
  constructor(
    @repository(TaxClassesRepository)
    public taxClassesRepository: TaxClassesRepository,
  ) {}

  @post('/tax-classes')
  @response(200, {
    description: 'TaxClasses model instance',
    content: {'application/json': {schema: getModelSchemaRef(TaxClasses)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxClasses, {
            title: 'NewTaxClasses',
            exclude: ['id'],
          }),
        },
      },
    })
    taxClasses: Omit<TaxClasses, 'id'>,
  ): Promise<TaxClasses> {
    return this.taxClassesRepository.create(taxClasses);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/tax-classes/count')
  @response(200, {
    description: 'TaxClasses model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TaxClasses) where?: Where<TaxClasses>,
  ): Promise<Count> {
    return this.taxClassesRepository.count(where);
  }

  @get('/tax-classes')
  @response(200, {
    description: 'Array of TaxClasses model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TaxClasses, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TaxClasses) filter?: Filter<TaxClasses>,
  ): Promise<TaxClasses[]> {
    return this.taxClassesRepository.find(filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/tax-classes')
  @response(200, {
    description: 'TaxClasses PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxClasses, {partial: true}),
        },
      },
    })
    taxClasses: TaxClasses,
    @param.where(TaxClasses) where?: Where<TaxClasses>,
  ): Promise<Count> {
    return this.taxClassesRepository.updateAll(taxClasses, where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/tax-classes/{id}')
  @response(200, {
    description: 'TaxClasses model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TaxClasses, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TaxClasses, {exclude: 'where'})
    filter?: FilterExcludingWhere<TaxClasses>,
  ): Promise<TaxClasses> {
    return this.taxClassesRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/tax-classes/{id}')
  @response(204, {
    description: 'TaxClasses PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxClasses, {partial: true}),
        },
      },
    })
    taxClasses: TaxClasses,
  ): Promise<void> {
    await this.taxClassesRepository.updateById(id, taxClasses);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @put('/tax-classes/{id}')
  @response(204, {
    description: 'TaxClasses PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() taxClasses: TaxClasses,
  ): Promise<void> {
    await this.taxClassesRepository.replaceById(id, taxClasses);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @del('/tax-classes/{id}')
  @response(204, {
    description: 'TaxClasses DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.taxClassesRepository.deleteById(id);
  }
}
