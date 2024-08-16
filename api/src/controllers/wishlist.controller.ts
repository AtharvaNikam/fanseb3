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
  HttpErrors,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Wishlist} from '../models';
import {WishlistRepository} from '../repositories';

export class WishlistController {
  constructor(
    @repository(WishlistRepository)
    public wishlistRepository: WishlistRepository,
  ) {}

  @post('/wishlists')
  @response(200, {
    description: 'Wishlist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Wishlist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Wishlist, {
            title: 'NewWishlist',
            exclude: ['id'],
          }),
        },
      },
    })
    wishlist: Omit<Wishlist, 'id'>,
  ): Promise<Wishlist> {
    return this.wishlistRepository.create(wishlist);
  }

  @get('/wishlists/count')
  @response(200, {
    description: 'Wishlist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Wishlist) where?: Where<Wishlist>): Promise<Count> {
    return this.wishlistRepository.count(where);
  }

  @get('/wishlists')
  @response(200, {
    description: 'Array of Wishlist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Wishlist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Wishlist) filter?: Filter<Wishlist>,
  ): Promise<Wishlist[]> {
    return this.wishlistRepository.find(filter);
  }

  @del('/wishlists/{id}')
  @response(204, {
    description: 'Wishlist DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.wishlistRepository.deleteById(id);
  }

  @get('/wishlists/user/{id}', {
    responses: {
      '200': {
        description: 'User belonging to Wishlist',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Wishlist, {includeRelations: true}),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Wishlist.prototype.id,
    @param.filter(Wishlist) filter?: Filter<Wishlist>,
  ): Promise<any> {
    const wishlist = await this.wishlistRepository.find({
      ...filter,
      include: [{relation: 'products'}],
      where: {
        userId: id,
      },
    });
    if (!wishlist || wishlist.length === 0) {
      throw new HttpErrors[404](`No wishlist found under given user id: ${id}`);
    }
    return wishlist;
  }
}
