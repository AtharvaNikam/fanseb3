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
import {Brand, Products} from '../models';
import {
  BrandRepository,
  ProductsRepository,
  UserRepository,
} from '../repositories';

export class BrandController {
  constructor(
    @inject('datasources.fanseb')
    public dataSource: FansebDataSource,
    @repository(BrandRepository)
    public brandRepository: BrandRepository,
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @post('/api/brands')
  @response(200, {
    description: 'Brand model instance',
    content: {'application/json': {schema: getModelSchemaRef(Brand)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Brand, {
            title: 'NewBrand',
            exclude: ['id'],
          }),
        },
      },
    })
    brand: Omit<Brand, 'id'>,
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
  ): Promise<Brand> {
    const brandData = await this.userRepository
      .brands(currnetUser.id)
      .create(brand);
    this.brandRepository.brandBalances(brandData.id).create({
      adminCommissionRate: 0,
    });
    return this.brandRepository.findById(brandData.id, {
      include: ['user', 'brandBalances'],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @get('/api/brands/count')
  @response(200, {
    description: 'Brand model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Brand) where?: Where<Brand>): Promise<Count> {
    return this.brandRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.BRAND, PermissionKeys.INFLUENCER]},
  })
  @get('/api/brands/list')
  @response(200, {
    description: 'Array of Brand model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Brand, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Brand) filter?: Filter<Brand>): Promise<Brand[]> {
    return this.brandRepository.find({
      ...filter,
      include: ['user', 'brandBalances'],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @get('/api/brands/{id}')
  @response(200, {
    description: 'Brand model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Brand, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Brand, {exclude: 'where'})
    filter?: FilterExcludingWhere<Brand>,
  ): Promise<Brand> {
    return this.brandRepository.findById(id, {
      include: ['user', 'brandBalances'],
      ...filter,
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @patch('/api/brands/{id}')
  @response(204, {
    description: 'Brand PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Brand, {partial: true}),
        },
      },
    })
    brand: Brand,
  ): Promise<void> {
    await this.brandRepository.updateById(id, brand);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.BRAND, PermissionKeys.INFLUENCER]},
  })
  @put('/api/brands/{id}')
  @response(204, {
    description: 'Brand PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() brand: Brand,
  ): Promise<void> {
    await this.brandRepository.replaceById(id, brand);
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @del('/api/brands/{id}')
  @response(204, {
    description: 'Brand DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.brandRepository.deleteById(id);
  }

  @authenticate({
    strategy: 'jwt',
    options: {
      required: [
        PermissionKeys.ADMIN,
        PermissionKeys.BRAND,
        PermissionKeys.INFLUENCER,
      ],
    },
  })
  @patch('/api/brands/updateAdminCommision/{id}')
  @response(204, {
    description: 'Brand PATCH success',
  })
  async updateAdminCommision(
    @param.path.number('id') id: number,
    @requestBody()
    brand: any,
  ): Promise<any> {
    const repo = new DefaultTransactionalRepository(Brand, this.dataSource);
    const tx = await repo.beginTransaction(IsolationLevel.READ_COMMITTED);
    try {
      await this.brandRepository.updateById(
        id,
        {isActive: true},
        {transaction: tx},
      );
      await this.brandRepository
        .brandBalances(id)
        .patch({adminCommissionRate: brand.adminCommissionRate});
      tx.commit();
      return Promise.resolve({
        success: true,
        message: 'Brand Commision Updated Successfully',
      });
    } catch (err) {
      tx.rollback();
    }
  }

  @get('/api/public/brands/list')
  @response(200, {
    description: 'Array of Brand model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Brand, {includeRelations: true}),
        },
      },
    },
  })
  async findAllBrands(
    @param.filter(Brand) filter?: Filter<Brand>,
  ): Promise<Brand[]> {
    return this.brandRepository.find({
      ...filter,
      include: ['user'],
    });
  }

  @get('/api/public/brands/{id}')
  @response(200, {
    description: 'Brand model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Brand, {includeRelations: true}),
      },
    },
  })
  async findPublicSingleBrandDetails(
    @param.path.number('id') id: number,
    @param.filter(Brand, {exclude: 'where'})
    filter?: FilterExcludingWhere<Brand>,
  ): Promise<Brand> {
    return this.brandRepository.findById(id, {
      include: ['user'],
      ...filter,
    });
  }

  @get('/api/public/products/list')
  @response(200, {
    description: 'Array of Product model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Products, {includeRelations: true}),
        },
      },
    },
  })
  async findAllProducts(
    @param.filter(Products) filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.productsRepository.find({
      ...filter,
      include: ['brand'],
    });
  }
}
