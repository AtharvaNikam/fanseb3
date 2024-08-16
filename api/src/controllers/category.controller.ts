import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {PermissionKeys} from '../authorization/permission-keys';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @post('/api/categories')
  @response(200, {
    description: 'Category model instance',
    content: {'application/json': {schema: getModelSchemaRef(Category)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.categoryRepository.create(category);
  }

  @get('/api/categories/count')
  @response(200, {
    description: 'Category model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Category) where?: Where<Category>): Promise<Count> {
    return this.categoryRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN,PermissionKeys.BRAND]},
  })
  @get('/api/categories')
  async find(@param.filter(Category) filter?: Filter<Category>): Promise<any> {
    const rootCategories = await this.categoryRepository.find(filter);

    const categoriesWithHierarchy = await Promise.all(
      rootCategories.map(category => this.buildCategoryHierarchy(category)),
    );

    return categoriesWithHierarchy;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/api/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Category, {exclude: 'where'})
    filter?: FilterExcludingWhere<Category>,
  ): Promise<Category> {
    const category = await this.categoryRepository.findById(id, filter); // Add await here
    if (!category) {
      throw new Error('Category not found');
    }

    const categoryWithHierarchy =
      await this.buildCategoryHierarchyForSingleCategory(category);

    return categoryWithHierarchy;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @patch('/api/categories/{id}')
  @response(204, {
    description: 'Category PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
  ): Promise<void> {
    await this.categoryRepository.updateById(id, category);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @del('/api/categories/{id}')
  @response(204, {
    description: 'Category DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }

  private async buildCategoryHierarchy(category: Category): Promise<any> {
    const result: any = {
      ...category,
      // Add other properties as needed
    };

    if (category.categoryId) {
      const parentCategory = await this.categoryRepository.findById(
        category.categoryId,
      );

      if (parentCategory) {
        result.parent = parentCategory;
      }
    }

    const children = await this.categoryRepository.find({
      where: {categoryId: category.id},
    });

    if (children && children.length > 0) {
      result.children = await Promise.all(
        children.map(child => this.buildCategoryHierarchy(child)),
      );
    }

    return result;
  }

  private async buildCategoryHierarchyForSingleCategory(
    category: any,
  ): Promise<any> {
    const result: any = {
      ...category,
    };

    if (category.categoryId) {
      const parentCategory = await this.categoryRepository.findById(
        category.categoryId,
      );

      if (parentCategory) {
        result.parent = parentCategory;
      }
    }

    const children = await this.categoryRepository.find({
      where: {categoryId: category.id},
    });

    if (children && children.length > 0) {
      result.children = await Promise.all(
        children.map(child =>
          this.buildCategoryHierarchyForSingleCategory(child),
        ),
      );
    }

    return result;
  }
}
