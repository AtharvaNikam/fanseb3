import {inject} from '@loopback/core';
import {
  Filter,
  FilterExcludingWhere,
  Where,
  repository,
} from '@loopback/repository';
import {
  HttpErrors,
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import axios from 'axios';
import crypto from 'crypto';
import {FansebDataSource} from '../datasources';
import {Orders} from '../models';
import {
  BrandBalancesRepository,
  InfluencerBalancesRepository,
  OrderItemsRepository,
  OrdersRepository,
  ProductsRepository,
  UserRepository,
  BrandRepository,
} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {PermissionKeys} from '../authorization/permission-keys';
export class OrdersController {
  constructor(
    @inject('datasources.fanseb')
    public dataSource: FansebDataSource,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
    @repository(BrandRepository)
    public brandRepository: BrandRepository,
    @repository(OrderItemsRepository)
    public orderItemsRepository: OrderItemsRepository,
    @repository(BrandBalancesRepository)
    public brandBalancesRepository: BrandBalancesRepository,
    @repository(InfluencerBalancesRepository)
    public influencerBalancesRepository: InfluencerBalancesRepository,
  ) {}

  @post('/orders')
  @response(200, {
    description: 'Orders model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orders)}},
  })
  async create(
    @requestBody()
    orders: any,
  ): Promise<any> {
    try {
      console.log(orders);
      const trackingNumber = this.orderItemsRepository.generateTrackingId(8);
      const inputForOrder: Partial<Orders> = {
        trackingNumber: trackingNumber,
        contact: orders.contact,
        amount: orders.amount,
        discount: 0,
        salesTax: orders.salesTax,
        paidTotal: orders.paidTotal,
        total: orders.total,
        subTotal: orders.subTotal ? orders.subTotal : orders.total,
        paymentGateway: orders.paymentGateway,
        shippingAddress: orders.shippingAddress,
        billingAddress: orders.billingAddress,
        deliveryFee: orders.deliveryFee,
        userId: orders.userId ? orders.userId : null,
      };
      const order = await this.ordersRepository.create(inputForOrder);

      console.log('trackingId', trackingNumber);
      console.log('order details', order);

      await Promise.all(
        orders.products.map(async (res: any) => {
          if (res.quantity > res.inventoryQuantity) {
            throw new HttpErrors[400]('Not Enough Product Quantity');
          }
          const updatedProductQuantity =
            Number(res.inventoryQuantity) - Number(res.quantity);
          await this.productsRepository.updateById(res.id, {
            quantity: updatedProductQuantity,
          });
          await this.orderItemsRepository.create({
            productsId: res.id,
            ordersId: order.id,
            quantity: res.quantity,
          });
        }),
      );

      const brandWiseProducts = orders.products.reduce(
        (accumulator: any, product: any) => {
          const {brandId, ...rest} = product;

          // Check if brandId already exists in accumulator
          const existingBrandIndex = accumulator.findIndex(
            (item: any) => item.brandId === brandId,
          );

          // Calculate total sales price for the product
          const totalSalesPrice = product.quantity * product.sale_price;

          if (existingBrandIndex !== -1) {
            // Brand exists, update products and total sales price
            accumulator[existingBrandIndex].products.push(rest);
            accumulator[existingBrandIndex].totalSalesPrice += totalSalesPrice;
          } else {
            // Brand doesn't exist, add new brand with product and total sales price
            accumulator.push({
              brandId,
              products: [rest],
              totalSalesPrice: totalSalesPrice,
            });
          }

          return accumulator;
        },
        [],
      );

      const influencerWiseProducts = orders.products.reduce(
        (accumulator: any, product: any) => {
          const {influencerId, ...rest} = product;

          // Check if brandId already exists in accumulator
          const existingBrandIndex = accumulator.findIndex(
            (item: any) => item.influencerId === influencerId,
          );

          // Calculate total sales price for the product
          const totalSalesPrice = product.quantity * product.sale_price;

          if (existingBrandIndex !== -1) {
            // Brand exists, update products and total sales price
            accumulator[existingBrandIndex].products.push(rest);
            accumulator[existingBrandIndex].totalSalesPrice += totalSalesPrice;
          } else {
            // Brand doesn't exist, add new brand with product and total sales price
            accumulator.push({
              influencerId,
              products: [rest],
              totalSalesPrice: totalSalesPrice,
            });
          }

          return accumulator;
        },
        [],
      );

      const childOrderPromises = brandWiseProducts.map(async (res: any) => {
        const childOrderTrackingId =
          this.orderItemsRepository.generateTrackingId(8);
        const inputForChildOrder: Partial<Orders> = {
          trackingNumber: childOrderTrackingId,
          contact: orders.contact,
          amount: res.totalSalesPrice,
          paidTotal: res.totalSalesPrice,
          total: res.totalSalesPrice,
          brandId: res.brandId,
          influencerId: res.influencerId,
          shippingAddress: orders.shippingAddress,
          billingAddress: orders.billingAddress,
          userId: orders.userId ? orders.userId : null,
          parentId: order.id,
        };

        const childOrder =
          await this.ordersRepository.create(inputForChildOrder);

        // Create associated products for the child order
        const childOrderProductPromises = res.products.map(
          async (product: any) => {
            await this.orderItemsRepository.create({
              productsId: product.id,
              ordersId: childOrder.id,
              quantity: product.quantity,
            });
          },
        );

        await Promise.all(childOrderProductPromises); // Wait for all product creation promises to resolve

        return childOrder; // Return the child order
      });

      // Wait for all child orders to be created
      const createdChildOrders = await Promise.all(childOrderPromises);

      // let influencerAmount = 0;
      // influencerWiseProducts.map(async (res: any) => {
      //   const influencerBalance: any =
      //     await this.influencerBalancesRepository.findOne({
      //       where: {
      //         influencerId: res.influencerId,
      //       },
      //     });
      //   console.log('influencer Balance before update',influencerBalance);
      //   if (influencerBalance) {
      //     let influencerCommisionRate =
      //       influencerBalance.influencer_commision_rate;
      //     let influencerEarnings: any =
      //       (res.totalSalesPrice * influencerCommisionRate) / 100;
      //     influencerAmount += influencerEarnings;
      //     let newInfluencerTotalEarnings =
      //       influencerBalance.totalEarnings + influencerEarnings;
      //     let newInfluencerCurrentBalance =
      //       influencerBalance.currentBalance + influencerEarnings;
      //     let newInfluencerTotalOrders = influencerBalance.totalOrders || 0 + 1;

      //     await this.influencerBalancesRepository.updateById(
      //       influencerBalance.id,
      //       {
      //         totalEarnings: newInfluencerTotalEarnings,
      //         currentBalance: newInfluencerCurrentBalance,
      //         totalOrders: newInfluencerTotalOrders,
      //       },
      //     );
      //     const influencerbalance = await this.influencerBalancesRepository.findById(influencerBalance.id);
      //     console.log('influencer balance after update', influencerbalance);
      //   }
      // });

      // createdChildOrders.map(async (childOrder: any) => {
      //   const balance = await this.brandBalancesRepository.findById(
      //     childOrder.brandId,
      //   );
      //   console.log('brand balance before update', balance);
      //   let adminCommissionRate: any = balance.adminCommissionRate;
      //   let brandEarnings: any =
      //     ((childOrder.total * (100 - adminCommissionRate)) / 100) - influencerAmount;
      //   let newBrandTotalEarnings = balance.totalEarnings + brandEarnings;
      //   let newCurrentBalance = balance.currentBalance + brandEarnings;
      //   await this.brandBalancesRepository.updateById(balance.id, {
      //     totalEarnings: newBrandTotalEarnings,
      //     currentBalance: newCurrentBalance,
      //   });
      //   const response = await this.brandBalancesRepository.findById(childOrder.brandId);
      //   console.log('brand balance after update', response);
      // });

      createdChildOrders.map(async (childOrder: any) => {
        const brandBalance = await this.brandBalancesRepository.findById(
          childOrder.brandId,
        );
        console.log('brand balance before update', brandBalance);
      
        // Get only influencers associated with the current brand
        const influencersForBrand = influencerWiseProducts.filter(
          (product: any) => {
            console.log('important console 1',product);
            console.log('important console 2',childOrder);
            return product.products.some((product : any) => product.brandId === childOrder.brandId)
          }
        );

        console.log('influencersForBrand', influencersForBrand);
      
        let influencerAmountForBrand = 0;
      
        for (const product of influencersForBrand) {
          const influencerBalance: any = await this.influencerBalancesRepository.findOne({
            where: {
              influencerId: product.influencerId,
            },
          });
      
          if (influencerBalance) {
            let influencerCommissionRate = influencerBalance.influencer_commision_rate;
            let influencerEarnings = (product.totalSalesPrice * influencerCommissionRate) / 100;
            
            influencerAmountForBrand += influencerEarnings;
            
            // Update influencer's balance details
            let newInfluencerTotalEarnings = influencerBalance.totalEarnings + influencerEarnings;
            let newInfluencerCurrentBalance = influencerBalance.currentBalance + influencerEarnings;
            let newInfluencerTotalOrders = (influencerBalance.totalOrders || 0) + 1;
      
            await this.influencerBalancesRepository.updateById(
              influencerBalance.id,
              {
                totalEarnings: newInfluencerTotalEarnings,
                currentBalance: newInfluencerCurrentBalance,
                totalOrders: newInfluencerTotalOrders,
              },
            );
            
            const updatedInfluencerBalance = await this.influencerBalancesRepository.findById(influencerBalance.id);
            console.log('influencer balance after update', updatedInfluencerBalance);
          }
        }

      
        // Calculate brand earnings after deducting the correct influencer amount
        let adminCommissionRate = brandBalance.adminCommissionRate;
        let brandEarnings = ((childOrder.total * (100 - (adminCommissionRate || 0))) / 100) - influencerAmountForBrand;
        let newBrandTotalEarnings = (brandBalance.totalEarnings || 0) + brandEarnings;
        let newCurrentBalance = (brandBalance.currentBalance || 0) + brandEarnings;
      
        // Update brand's balance details
        await this.brandBalancesRepository.updateById(brandBalance.id, {
          totalEarnings: newBrandTotalEarnings,
          currentBalance: newCurrentBalance,
        });
      
        const updatedBrandBalance = await this.brandBalancesRepository.findById(childOrder.brandId);
        console.log('brand balance after update', updatedBrandBalance);
      });
      
      // Commit the transaction

      // Return the response
      return Promise.resolve({
        success: true,
        order: order,
        message: 'Order Created Successfully',
      });
    } catch (err) {
      console.error('Error creating orders:', err);
      return {success: false, message: err.message};
    }
  }

  @get('/orders')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Orders) filter?: Filter<Orders>): Promise<any> {
    const orders = await this.ordersRepository.find({
      ...filter,
      include: ['products'],
    });
    if (!orders || orders.length === 0) {
      throw new HttpErrors[404](`No orders found`);
    }
    const ordersWithHierarchy = await Promise.all(
      orders.map(order => this.buildOrderHierarchy(order)),
    );
    return ordersWithHierarchy;
    //   const ordersWithChildrenAndProducts = [];

    //   for (const order of orders) {
    //     const childrenAndProducts = await this.getChildrenAndProducts(order.id);
    //     if (childrenAndProducts.length > 0) {
    //       const orderWithChildrenAndProducts = {
    //         ...order,
    //         children: childrenAndProducts,
    //         products: await this.ordersRepository.products(order.id).find(),
    //       };
    //       ordersWithChildrenAndProducts.push(orderWithChildrenAndProducts);
    //     }
    //   }

    //   return ordersWithChildrenAndProducts;
  }

  @get('/api/orders/brand/{id}')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async findBrandOrdersById(
    @param.path.number('id') id: number,
    @param.filter(Orders) filter?: Filter<Orders>,
  ): Promise<any> {
    const orders = await this.ordersRepository.find({
      ...filter,
      include: ['products'],
      where: {
        brandId: id,
      },
    });
    if (!orders || orders.length === 0) {
      throw new HttpErrors[404](`No orders found under given brand id: ${id}`);
    }

    return orders;
  }
  @get('/api/orders/brand/count')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async countBrandOrdersById(
    @param.filter(Orders) filter?: Filter<Orders>,
    @param.where(Orders) where?: Where<Orders>,
  ): Promise<any> {
    const orders = await this.ordersRepository.count(where);
    if (!orders) {
      throw new HttpErrors[404](`No orders found under given brand `);
    }

    return orders;
  }

  @get('/api/orders/influencer/{id}')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async findInfluencerOrdersById(
    @param.path.number('id') id: number,
    @param.filter(Orders) filter?: Filter<Orders>,
  ): Promise<any> {
    const orders = await this.ordersRepository.find({
      ...filter,
      include: ['products'],
      where: {
        influencerId: id,
      },
    });
    if (!orders || orders.length === 0) {
      throw new HttpErrors[404](
        `No orders found under given influencer id: ${id}`,
      );
    }

    return orders;
  }

  @get('/api/orders/customer/{id}')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async findCustomerOrdersById(
    @param.path.number('id') id: number,
    @param.filter(Orders) filter?: Filter<Orders>,
  ): Promise<any> {
    const orders = await this.ordersRepository.find({
      ...filter,
      include: ['products'],
      where: {
        userId: id,
      },
    });
    if (!orders || orders.length === 0) {
      throw new HttpErrors[404](`No orders found under given user id: ${id}`);
    }

    return orders;
  }

  @get('/orders/{id}')
  @response(200, {
    description: 'Orders model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orders, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Orders, {exclude: 'where'})
    filter?: FilterExcludingWhere<Orders>,
  ): Promise<Orders> {
    const orders = await this.ordersRepository.findById(id, {
      ...filter,
      include: [
        {relation: 'products'},
        {
          relation: 'user',
          scope: {
            include: [{relation: 'userProfile', scope: {fields: ['avatar']}}],
            fields: {
              password: false,
              otp: false,
              otpExpireAt: false,
              permissions: false,
            },
          },
        },
        {relation: 'refunds'},
      ],
    });
    const itemsQuantity = await this.orderItemsRepository.find({
      where: {
        ordersId: id,
      },
    });
    orders.products.forEach((product: any) => {
      product.quantity = itemsQuantity.find(p => p.productsId === product.id)
        ?.quantity;
    });
    return orders;
  }

  @patch('/orders/{id}')
  @response(204, {
    description: 'Orders PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.updateById(id, orders);
  }

  @del('/orders/{id}')
  @response(204, {
    description: 'Orders DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ordersRepository.deleteById(id);
  }

  @post('/initiatePhonePePayment')
  async initiatePhonePePayment(
    @requestBody()
    paymentDetails: any,
  ): Promise<any> {
    try {
      const merchantTransactionId = 'M' + Date.now();
      const {price, redirectUrl} = paymentDetails;
      const data = {
        merchantId: process.env.MERCHANT_ID,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: process.env.MERHCHANT_USER_ID,
        amount: price * 100,
        redirectUrl: redirectUrl,
        redirectMode: 'REDIRECT',
        callbackUrl: redirectUrl,
        mobileNumber: process.env.MOBILENO || '9999999999',
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };
      const encode = Buffer.from(JSON.stringify(data)).toString('base64');
      const saltKey = process.env.SALTKEY;
      const saltIndex = process.env.SALT_INDEX;
      const string = encode + '/pg/v1/pay' + saltKey;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const finalXHeader = `${sha256}###${saltIndex}`;
      const response = await axios.post(
        process.env.PAYEMENT_ENDPOINT ||
          ' https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay',
        {
          request: encode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': finalXHeader,
          },
        },
      );

      const rData = response.data;
      return rData;
    } catch (error) {
      console.error('Error initiating PhonePe payment:', error);
      throw error;
    }
  }

  @post('/checkPhonePePaymentStatus')
  async checkPhonePePaymentStatus(
    @requestBody()
    paymentDetails: any,
  ): Promise<any> {
    try {
      const {merchantTransactionId} = paymentDetails;

      const saltKey = process.env.SALTKEY;
      const saltIndex = process.env.SALT_INDEX;

      const finalXHeader =
        crypto
          .createHash('sha256')
          .update(
            `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}${saltKey}`,
          )
          .digest('hex') +
        '###' +
        saltIndex;

      const response = await axios.get(
        `${process.env.STATUS_ENDPOINT}${process.env.MERCHANT_ID}/${merchantTransactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-VERIFY': finalXHeader,
            'X-MERCHANT-ID': process.env.MERCHANT_ID,
          },
        },
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error initiating PhonePe payment:', error);
      throw error;
    }
  }

  async getChildrenAndProducts(parentOrderId: any): Promise<any[]> {
    const childOrders = await this.ordersRepository.find({
      where: {
        parentId: parentOrderId,
      },
    });

    const childOrdersWithProducts = [];
    for (const childOrder of childOrders) {
      const childOrderWithProducts = {
        ...childOrder,
        products: await this.ordersRepository.products(childOrder.id).find(),
      };
      childOrdersWithProducts.push(childOrderWithProducts);
    }

    return childOrdersWithProducts;
  }

  async buildOrderHierarchy(order: Orders): Promise<any> {
    const result: any = {
      ...order,
    };

    if (order.parentId) {
      const parentOrder = await this.ordersRepository.findById(order.parentId);
      if (parentOrder) {
        result.parent = parentOrder;
      }
    }

    const childOrders = await this.ordersRepository.find({
      where: {parentId: order.id},
    });

    if (childOrders && childOrders.length > 0) {
      result.children = await Promise.all(
        childOrders.map(childOrder => this.buildOrderHierarchy(childOrder)),
      );
    }

    // Fetch associated products for the current order
    result.products = await this.ordersRepository.products(order.id).find();

    return result;
  }

  async buildOrderHierarchyForSingleOrder(order: Orders): Promise<any> {
    const result: any = {
      ...order,
    };

    if (order.parentId) {
      const parentOrder = await this.ordersRepository.findById(order.parentId);
      if (parentOrder) {
        result.parent = parentOrder;
      }
    }

    const childOrders = await this.ordersRepository.find({
      where: {parentId: order.id},
    });

    if (childOrders && childOrders.length > 0) {
      result.children = await Promise.all(
        childOrders.map(childOrder =>
          this.buildOrderHierarchyForSingleOrder(childOrder),
        ),
      );
    }

    // Fetch associated products for the current order
    result.products = await this.ordersRepository.products(order.id).find();

    return result;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [PermissionKeys.ADMIN]},
  })
  @get('/adminSalesHistoy')
  @response(200)
  async getSalesHistory(): Promise<any> {
    const totalRevenue = await this.ordersRepository.getTotalOfAllOrders();
    const todaysTotalRevenue =
      await this.ordersRepository.getTotalOfTodayOrders();
    const ordersCount = await this.ordersRepository.count();
    const brandsCount = await this.brandRepository.count();

    const orders: Orders[] = await this.ordersRepository.find();

    const uniqueYears = Array.from(
      new Set(orders.map((order: any) => order.createdAt.getFullYear())),
    );

    // Calculate monthly total orders for each year
    const chartSeries = uniqueYears.map(year => {
      const ordersOfYear = orders.filter(
        (order: any) => order.createdAt.getFullYear() === year,
      );
      const monthlyTotalOrders = this.calculateMonthlyTotalOrders(ordersOfYear);
      return {
        year: year.toString(),
        data: [
          {
            name: 'Sale',
            data: monthlyTotalOrders,
          },
        ],
      };
    });

    return {
      totalRevenue: totalRevenue,
      totalOrders: ordersCount.count,
      todaysTotalRevenue: todaysTotalRevenue,
      totalBrands: brandsCount.count,
      chart: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        series: chartSeries,
      },
    };
  }

  // Function to calculate monthly total orders
  private calculateMonthlyTotalOrders(orders: Orders[]): number[] {
    const monthlyTotalOrders: number[][] = new Array(12).fill(0).map(() => []);

    orders.forEach((order: any) => {
      const month = order.createdAt.getMonth();
      monthlyTotalOrders[month].push(1); // Assuming each order counts as 1
    });

    // Calculate the total count for each month
    const monthlyTotalCount: number[] = monthlyTotalOrders.map(
      month => month.length,
    );

    return monthlyTotalCount;
  }
}
