import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {PermissionKeys} from '../authorization/permission-keys';
import {Products, Questions} from '../models';
import {ProductsRepository, QuestionsRepository} from '../repositories';

export class ProductsQuestionsController {
  constructor(
    @repository(ProductsRepository)
    protected productsRepository: ProductsRepository,
    @repository(QuestionsRepository)
    protected questionsRepository: QuestionsRepository,
  ) {}

  @get('/products/{id}/questions', {
    responses: {
      '200': {
        description: 'Array of Products has many Questions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Questions)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Questions>,
  ): Promise<Questions[]> {
    return this.productsRepository.questions(id).find(filter);
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
  @get('/questions', {
    responses: {
      '200': {
        description: 'Array of Products has many Questions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Questions)},
          },
        },
      },
    },
  })
  async findAllQuestions(
    @param.query.object('filter') filter?: Filter<Questions>,
  ): Promise<Questions[]> {
    return this.questionsRepository.find({
      ...filter,
      include: [
        {
          relation: 'products',
          scope: {
            include: [
              {
                relation: 'brand',
              },
            ],
          },
        },
        {
          relation: 'user',
        },
      ],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.CUSTOMER]},
  })
  @post('/products/{id}/questions', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Questions)}},
      },
    },
  })
  async create(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Questions, {
            title: 'NewQuestionsInProducts',
            exclude: ['id'],
            optional: ['productsId'],
          }),
        },
      },
    })
    questions: Omit<Questions, 'id'>,
  ): Promise<Questions> {
    const inputData: Questions = {
      ...questions,
      userId: currnetUser.id,
    };
    console.log('🚀 ~ inputData:', inputData);
    return this.productsRepository.questions(id).create(inputData);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.BRAND, PermissionKeys.ADMIN]},
  })
  @patch('/products/{id}/questions', {
    responses: {
      '200': {
        description: 'Products.Questions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Questions, {partial: true}),
        },
      },
    })
    questions: Partial<Questions>,
    @param.query.object('where', getWhereSchemaFor(Questions))
    where?: Where<Questions>,
  ): Promise<Count> {
    const inputData: Partial<Questions> = {
      ...questions,
      // userId: currnetUser.id,
    };
    return this.productsRepository.questions(id).patch(inputData, where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.CUSTOMER,
        PermissionKeys.BRAND,
      ],
    },
  })
  @del('/products/{id}/questions', {
    responses: {
      '200': {
        description: 'Products.Questions DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Questions))
    where?: Where<Questions>,
  ): Promise<Count> {
    return this.productsRepository.questions(id).delete(where);
  }
}
