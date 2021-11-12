import { authenticate, AuthenticationBindings, UserProfileFactory } from '@loopback/authentication';
import { inject, service } from '@loopback/core';
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
import {CartItem, OrderDetails} from '../models';
import {CartItemRepository, ShoppingSessionRepository} from '../repositories';
import { UserProfile } from "@loopback/security";
import { CheckoutService } from '../services';

@authenticate('user')
export class CheckoutController {
  constructor(
    @repository(CartItemRepository) public cartItemRepository : CartItemRepository,
    @repository(ShoppingSessionRepository) public shoppingSessionRepository: ShoppingSessionRepository,
    @service(CheckoutService) public checkoutService: CheckoutService,

    @inject(AuthenticationBindings.CURRENT_USER) public user: UserProfile,
  ) {}

  @post('/checkout')
  @response(200, {
    description: 'CartItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(CartItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {
            title: 'NewCartItem',
            exclude: ['id', 'session_id'],
          }),
        },
      },
    })
    cartItem: Omit<CartItem, 'id'>,
  ): Promise<CartItem> {
    return await this.checkoutService.create(this.user.id, cartItem);
  }

  @post('/checkout/sell')
  @response(200, {
    description: 'CartItem Sell',
    content: {'application/json': {schema: getModelSchemaRef(CartItem)}}
  })
  async sell(
    @param.filter(CartItem) filter?: Filter<CartItem>
  ): Promise<OrderDetails> {
    return await this.checkoutService.sell(this.user.id);
  }

  @get('/checkout')
  @response(200, {
    description: 'Array of CartItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CartItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CartItem) filter?: Filter<CartItem>,
  ): Promise<CartItem[]> {
    const session = await this.shoppingSessionRepository.findOne({where: {user_id: this.user.id}});

    return this.cartItemRepository.find({where: {session_id: session!.id}});
  }

  @patch('/checkout')
  @response(200, {
    description: 'CartItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {partial: true}),
        },
      },
    })
    cartItem: CartItem,
    @param.where(CartItem) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.cartItemRepository.updateAll(cartItem, where);
  }

  @get('/checkout/{id}')
  @response(200, {
    description: 'CartItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CartItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CartItem, {exclude: 'where'}) filter?: FilterExcludingWhere<CartItem>
  ): Promise<CartItem> {
    return this.cartItemRepository.findById(id, filter);
  }

  @patch('/checkout/{id}')
  @response(204, {
    description: 'CartItem PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {partial: true}),
        },
      },
    })
    cartItem: CartItem,
  ): Promise<void> {
    await this.cartItemRepository.updateById(id, cartItem);
  }

  @put('/checkout/{id}')
  @response(204, {
    description: 'CartItem PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cartItem: CartItem,
  ): Promise<void> {
    await this.cartItemRepository.replaceById(id, cartItem);
  }

  @del('/checkout/{id}')
  @response(204, {
    description: 'CartItem DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cartItemRepository.deleteById(id);
  }
}
