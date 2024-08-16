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
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {PermissionKeys} from '../authorization/permission-keys';
import {InfluencerProduct, Products} from '../models';
import {
  InfluencerProductRepository,
  ProductsRepository,
  UserRepository,
} from '../repositories';

export class UserProductsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ProductsRepository)
    protected productsRepository: ProductsRepository,
    @repository(InfluencerProductRepository)
    protected influencerProductRepository: InfluencerProductRepository,
  ) {}

  @get('/api/product/count')
  @response(200, {
    description: 'Product model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InfluencerProduct) where?: Where<InfluencerProduct>,
  ): Promise<Count> {
    return this.productsRepository.count(where);
  }

  @get('/api/influencer/product/count')
  @response(200, {
    description: 'Influencer Product model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countInfluencerProducts(
    @param.query.object('where') where?: Where<InfluencerProduct>,
  ): Promise<Count> {
    return this.influencerProductRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER, PermissionKeys.CUSTOMER]},
  })
  @get('/influencer/{id}/products', {
    responses: {
      '200': {
        description:
          'Array of User has many Products through InfluencerProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfluencerProduct>,
    @param.query.object('where') where?: Where<InfluencerProduct>,
  ): Promise<any> {
    const filterData = {
      ...filter,
      include: ['products'],
      where: {
        ...where,
        userId: id,
      },
    };
    const influencerProducts =
      await this.influencerProductRepository.find(filterData);
    return influencerProducts;
  }

  @get('/products/{id}', {
    responses: {
      '200': {
        description:
          'Array of User has many Products through InfluencerProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async findAllProducts(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Products>,
    @param.query.object('where') where?: Where<Products>,
  ): Promise<any> {
    const influencerProducts = await this.productsRepository.findById(id);
    return influencerProducts;
  }

  @get('api/public/influencer/{id}/products', {
    responses: {
      '200': {
        description:
          'Array of User has many Products through InfluencerProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async findInfluencerProducts(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfluencerProduct>,
    @param.query.object('where') where?: Where<InfluencerProduct>,
  ): Promise<any> {
    const filterData = {
      ...filter,
      include: [
        {
          relation: 'products',
          scope: {
            include: [{relation: 'brand'}],
          },
        },
      ],
      where: {
        userId: id,
      },
    };
    const influencerProducts =
      await this.influencerProductRepository.find(filterData);
    return influencerProducts;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER, PermissionKeys.CUSTOMER]},
  })
  @get('/influencer/allInfluencerProducts', {
    responses: {
      '200': {
        description:
          'Array of User has many Products through InfluencerProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async findAllInfluencerProducts(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.query.object('filter') filter?: Filter<InfluencerProduct>,
  ): Promise<any> {
    const filterData = {
      ...filter,
      include: [
        {
          relation: 'products',
          scope: {
            include: [{relation: 'brand'}],
          },
        },
      ],
      where: {
        userId: currnetUser.id,
      },
    };
    const influencerProducts =
      await this.influencerProductRepository.find(filterData);
    return influencerProducts;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @post('/influencer/product')
  async create(
    @requestBody() products: any,
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
  ): Promise<any> {
    if (products.productsId && products.productsId.length > 0) {
      products.productsId.map(async (res: any) => {
        const influencerProduct =
          await this.influencerProductRepository.findOne({
            where: {
              userId: currnetUser.id,
              productsId: res,
            },
          });
        const inputData = {
          userId: currnetUser.id,
          productsId: res,
          featureInfluencerImageUrl: products.featureInfluencerImageUrl,
          type: products.type,
        };
        if (influencerProduct && products.type !== influencerProduct.type) {
          await this.influencerProductRepository.updateById(
            influencerProduct.id,
            inputData,
          );
        } else {
          await this.influencerProductRepository.create(inputData);
        }
      });
    }

    return Promise.resolve({
      success: true,
      message: 'Influencer Product added successfully',
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @patch('/influencer/products/{id}')
  async patch(
    @param.path.number('id') id: number,
    @requestBody()
    products: any,
  ): Promise<any> {
    await this.influencerProductRepository.updateById(id, products);
    return Promise.resolve({
      success: true,
      message: 'Influencer Product updated successfully',
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @patch('/products/{id}')
  async patchProduct(
    @param.path.number('id') id: number,
    @requestBody()
    products: any,
  ): Promise<any> {
    await this.productsRepository.updateById(id, products);
    return Promise.resolve({
      success: true,
      message: 'Product updated successfully',
    });
  }

  @post('/products/createAll')
  async createAllProducts(@requestBody() products: any[]): Promise<any> {
    const createdProducts = [];
    for (const product of products) {
      const createdProduct = await this.productsRepository.create(product);
      createdProducts.push(createdProduct);
    }
    return {
      success: true,
      message: 'Products created successfully',
      data: createdProducts,
    };
  }

  @post('/brands/{id}/products/createAll', {
    responses: {
      '200': {
        description: 'Products created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {type: 'boolean'},
                message: {type: 'string'},
                data: {
                  type: 'array',
                  items: getModelSchemaRef(Products),
                },
              },
            },
          },
        },
      },
    },
  })
  async createAllProductsForBrand(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Products),
          },
        },
      },
    })
    products: Products[],
  ): Promise<any> {
    const createdProducts = [];
    for (const product of products) {
      // Associate the product with the brand
      product.brandId = id;
      const createdProduct = await this.productsRepository.create(product);
      createdProducts.push(createdProduct);
    }
    return {
      success: true,
      message: 'Products created successfully',
      data: createdProducts,
    };
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @del('/influencer/product/{id}', {
    responses: {
      '200': {
        description: 'User.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.path.number('id') id: number,
  ): Promise<any> {
    await this.influencerProductRepository.deleteById(id);
    return Promise.resolve({
      success: true,
      message: 'Influencer Product Deleted Successfully',
    });
  }
}
