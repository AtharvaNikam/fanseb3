import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {CountSchema, Filter, repository, Where} from '@loopback/repository';
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
import {Reels} from '../models';
import {
  ReelProductsRepository,
  ReelsRepository,
  UserRepository,
} from '../repositories';
import { all } from 'axios';

export class UserReelsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ReelProductsRepository)
    protected reelProductsRepository: ReelProductsRepository,
    @repository(ReelsRepository) protected reelsRepository: ReelsRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @get('/users/reels', {
    responses: {
      '200': {
        description: 'Array of User has many Reels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reels)},
          },
        },
      },
    },
  })
  async find(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.query.object('filter') filter?: Filter<Reels>,
  ): Promise<Reels[]> {
    const includeFilter = {
      relation: 'user',
      scope: {
        fields: {
          password: false,
          otp: false,
          otpExpireAt: false,
          permissions: false,
        },
      },
    };
    return this.userRepository
      .reels(currnetUser.id)
      .find({include: [includeFilter, 'products'], ...filter});
  }

  @get('api/public/users/reels/{name}', {
    responses: {
      '200': {
        description: 'Array of User has many Reels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reels)},
          },
        },
      },
    },
  })
  async findPublicReels(@param.path.string('name') name: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        userName: name,
      },
    });
    const includeFilter = {
      relation: 'user',
      scope: {
        fields: {
          password: false,
          otp: false,
          otpExpireAt: false,
          permissions: false,
        },
      },
    };
    return this.userRepository
      .reels(user?.id)
      .find({include: [includeFilter, 'products']});
  }
  // header removed for testing
  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER,]},
  })
  @get('/users/reels/{id}', {
    responses: {
      '200': {
        description: 'Reel Details',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reels),
          },
        },
      },
    },
  })
  async getSingleReel(@param.path.number('id') id: number): Promise<any> {
    const reel = await this.reelsRepository.findOne({
      where: {
        id: id,
      },

      include: [
        {
          relation: 'user',
          scope: {
            include: [
              {
                relation: 'userProfile',
                scope: {fields: ['avatar']},
              },
            ],
            fields: {
              password: false,
              otp: false,
              otpExpireAt: false,
              permissions: false,
            },
          },
        },
        'products',
      ],
    });
    return Promise.resolve({
      ...reel,
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @post('/users/reels', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reels)}},
      },
    },
  })
  async create(
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @requestBody()
    reels: any,
  ): Promise<any> {
    const inputData: Partial<Reels> = {
      name: reels.name,
      reelLink: reels.reelLink,
      thumbnail: reels.thumbnail,
      videoDuration: reels.videoDuration,
    };
    const reel = await this.userRepository
      .reels(currnetUser.id)
      .create(inputData);
    if (reels.products && reels.products.length > 0) {
      reels.products.map(async (res: any) => {
        await this.reelProductsRepository.create({
          productsId: res,
          reelsId: reel.id,
        });
      });
    }
    return reel;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @patch('/users/reels/{id}', {
    responses: {
      '200': {
        description: 'User.Reels PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @requestBody()
    reels: any,
  ): Promise<any> {
    console.log('request body', requestBody);
    const inputData: Partial<Reels> = {
      name: reels.name,
      reelLink: reels.reelLink,
      thumbnail: reels.thumbnail,
      videoDuration: reels.videoDuration,
    };
    await this.userRepository.reels(currnetUser.id).patch(inputData, {id: id});
    await this.reelProductsRepository.deleteAll({reelsId: id});
    if (reels.products && reels.products.length > 0) {
      reels.products.map(async (res: any) => {
        await this.reelProductsRepository.create({
          productsId: res,
          reelsId: id,
        });
      });
    }
    return Promise.resolve({
      success: true,
      message: 'Reel Updated Successfully',
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.INFLUENCER]},
  })
  @del('/users/reels/{id}', {
    responses: {
      '200': {
        description: 'User.Reels DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @inject(AuthenticationBindings.CURRENT_USER) currnetUser: UserProfile,
    @param.query.object('where', getWhereSchemaFor(Reels)) where?: Where<Reels>,
  ): Promise<any> {
    await this.userRepository.reels(currnetUser.id).delete({id: id, ...where});
    return Promise.resolve({
      success: true,
      message: 'Reel Deleted Successfully',
    });
  }

  @post('/users/randomReels', {
    responses: {
      '200': {
        description: 'Array of User has many Reels',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reels)},
          },
        },
      },
    },
  })
  async randomizedReels(
    @requestBody() reel: any,
    @param.query.object('filter') filter?: Filter<Reels>,
  ): Promise<Reels[]> {
    console.log(reel);
    let allReels: Reels[];
    
    if (reel) {
      if (!reel.id) {
        throw new Error('Reel Id is required');
      }

      // Fetch specific reel by ID
      const reelData = await this.reelsRepository.findById(reel.id, {
        include: [
          {
            relation: 'user',
            scope: {
              include: [
                {
                  relation: 'userProfile',
                  scope: {fields: ['avatar']},
                },
              ],
              fields: {
                password: false,
                otp: false,
                otpExpireAt: false,
                permissions: false,
              },
            },
          },
          'products',
        ],
      });

      // Fetch other reels excluding the one with the specified reel ID
      const remainingReels = await this.reelsRepository.find({
        where: { id: { neq: reel.id } }, // Updated to use reel.id
        include: [
          {
            relation: 'user',
            scope: {
              include: [
                {
                  relation: 'userProfile',
                  scope: {fields: ['avatar']},
                },
              ],
              fields: {
                password: false,
                otp: false,
                otpExpireAt: false,
                permissions: false,
              },
            },
          },
          'products',
        ],
        limit: filter?.limit ? filter.limit - 1 : 9,
        order: ['createdAt DESC'],
      });

      // Shuffle the remaining reels and add the specific reel at the start
      const randomRemainingReels = this.shuffleArray(remainingReels);
      randomRemainingReels.unshift(reelData);

      return randomRemainingReels;

    } else {
      // Fetch all reels if no specific reel is provided
      allReels = await this.reelsRepository.find({
        ...filter,
        order: ['createdAt DESC'],
        include: [
          {
            relation: 'user',
            scope: {
              include: [
                {
                  relation: 'userProfile',
                  scope: {fields: ['avatar']},
                },
              ],
              fields: {
                password: false,
                otp: false,
                otpExpireAt: false,
                permissions: false,
              },
            },
          },
          'products',
        ],
      });

      // Shuffle all reels
      const randomizedReels = this.shuffleArray(allReels);
      return randomizedReels;
    }
  }

  private shuffleArray(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
