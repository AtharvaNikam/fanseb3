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
import {Products, Reviews} from '../models';
import {ProductsRepository, ReviewsRepository} from '../repositories';

export class ProductsReviewsController {
  constructor(
    @repository(ProductsRepository)
    protected productsRepository: ProductsRepository,
    @repository(ReviewsRepository)
    protected reviewsRepository: ReviewsRepository,
  ) {}

  @get('/reviews', {
    responses: {
      '200': {
        description: 'Array of Products has many Reviews',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reviews)},
          },
        },
      },
    },
  })
  async findAllReviews(
    @param.query.object('filter') filter?: Filter<Reviews>,
  ): Promise<Reviews[]> {
    return this.reviewsRepository.find({...filter, include: ['products']});
  }

  @get('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of Products has many Reviews',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reviews)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Reviews>,
  ): Promise<Reviews[]> {
    return this.productsRepository.reviews(id).find(filter);
  }

  @post('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            title: 'NewReviewsInProducts',
            exclude: ['id'],
            optional: ['productsId'],
          }),
        },
      },
    })
    reviews: Omit<Reviews, 'id'>,
  ): Promise<Reviews> {
    return this.productsRepository.reviews(id).create(reviews);
  }

  @patch('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Products.Reviews PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {partial: true}),
        },
      },
    })
    reviews: Partial<Reviews>,
    @param.query.object('where', getWhereSchemaFor(Reviews))
    where?: Where<Reviews>,
  ): Promise<Count> {
    return this.productsRepository.reviews(id).patch(reviews, where);
  }

  @del('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Products.Reviews DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Reviews))
    where?: Where<Reviews>,
  ): Promise<Count> {
    return this.productsRepository.reviews(id).delete(where);
  }
}
