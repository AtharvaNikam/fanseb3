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
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Brand, Products} from '../models';
import {
  BrandRepository,
  ProductsRepository,
  ReviewsRepository,
} from '../repositories';
import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { PermissionKeys } from '../authorization/permission-keys';

export class BrandProductsController {
  constructor(
    @repository(BrandRepository) protected brandRepository: BrandRepository,
    @repository(ProductsRepository)
    protected productsRepository: ProductsRepository,
    @repository(ReviewsRepository)
    protected reviewsRepository: ReviewsRepository,
  ) {}

  @get('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Brand has many Products',
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
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.brandRepository.products(id).find(filter);
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Brand has many Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async findAllProducts(
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    const newFilter = {
      ...filter,
      include: [
        {
          relation: 'brand',
        },
      ],
    };
    return this.productsRepository.find(newFilter);
  }

  @get('/brands/{brandId}/products/{productId}', {
    responses: {
      '200': {
        description: 'Array of Brand has many Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async findSingle(
    @param.path.number('brandId') brandId: number,
    @param.path.number('productId') productId: number,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<any> {
    const productDetail = await this.brandRepository.products(brandId).find({
      where: {
        id: productId,
      },
      include: [
        {
          relation: 'reviews',
        },
        {
          relation: 'questions',
        },
      ],
    });

    if (productDetail.length > 0) {
      const singleProduct = productDetail[0];
      const reviews = await this.reviewsRepository.find({
        where: {
          productsId: productId,
        },
      });
      const totalRatings = reviews.reduce(
        (acc, review) => acc + review.ratings,
        0,
      );
      const averageRating = totalRatings / reviews.length;
      const ratingsDistribution = [
        {
          name: '1 Star',
          starCount: reviews.filter(review => review.ratings === 1).length * 1,
          reviewCount: reviews.filter(review => review.ratings === 1).length,
        },
        {
          name: '2 Star',
          starCount: reviews.filter(review => review.ratings === 2).length * 2,
          reviewCount: reviews.filter(review => review.ratings === 2).length,
        },
        {
          name: '3 Star',
          starCount: reviews.filter(review => review.ratings === 3).length * 3,
          reviewCount: reviews.filter(review => review.ratings === 3).length,
        },
        {
          name: '4 Star',
          starCount: reviews.filter(review => review.ratings === 4).length * 4,
          reviewCount: reviews.filter(review => review.ratings === 4).length,
        },
        {
          name: '5 Star',
          starCount: reviews.filter(review => review.ratings === 5).length * 5,
          reviewCount: reviews.filter(review => review.ratings === 5).length,
        },
      ];

      return {
        ...singleProduct,
        totalRatings: totalRatings,
        ratings: ratingsDistribution,
        averageRating: averageRating,
      };
    } else {
      return Promise.resolve({
        success: false,
        message: 'Product not found',
      });
    }
  }

  @post('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Brand model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Brand.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInBrand',
            exclude: ['id'],
            optional: ['brandId'],
          }),
        },
      },
    })
    products: Omit<Products, 'id'>,
  ): Promise<any> {
    try {
      await this.brandRepository.products(id).create(products);
      return Promise.resolve({
        success: true,
        message: 'product created successfully',
      });
    } catch (err) {
      return err;
    }
  }

  @patch('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Brand.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products))
    where?: Where<Products>,
  ): Promise<any> {
    await this.brandRepository.products(id).patch(products, where);
    return Promise.resolve({
      success: true,
      message: 'product updated successfully',
    });
  }

  @del('/brands/{id}/products/{productId}', {
    responses: {
      '200': {
        description: 'Brand.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.path.number('productId') productId: number,
    @param.query.object('where', getWhereSchemaFor(Products))
    where?: Where<Products>,
  ): Promise<any> {
    try{
      const product = await this.productsRepository.findById(productId);
      if(product){
        if(product.brandId === id){
          await this.productsRepository.deleteById(productId);
        }else{
          throw new HttpErrors.BadRequest("Permission denied!, you cant delete this product");
        }
      }else{
        throw new HttpErrors.NotFound("No product found with given id");
      }
    }catch(error){
      throw error;
    }
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
      ],
    },
  })
  @del('/products/{productId}', {
    responses: {
      '200': {
        description: 'Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteProductByAdmin(
    @param.path.number('productId') productId: number,
    @param.query.object('where', getWhereSchemaFor(Products))
    where?: Where<Products>,
  ): Promise<any> {
    try{
      const product = await this.productsRepository.findById(productId);
      if(product){
        await this.productsRepository.deleteById(productId);
        return{
          success : true,
          message : 'product deleted'
        }
      }else{
        throw new HttpErrors.NotFound("No product found with given id");
      }
    }catch(error){
      throw error;
    }
  }
}
