import { authenticate } from '@loopback/authentication';
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
import {CartItem} from '../models';
import {CartItemRepository} from '../repositories';

export class CheckoutController {
  constructor(
    @repository(CartItemRepository) public cartItemRepository : CartItemRepository,
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
            exclude: ['id'],
          }),
        },
      },
    })
    cartItem: Omit<CartItem, 'id'>,
  ): Promise<CartItem> {
    return this.cartItemRepository.create(cartItem);
  }

  @authenticate('user')
  @get('/checkout/count')
  @response(200, {
    description: 'CartItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CartItem) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.cartItemRepository.count(where);
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
    return this.cartItemRepository.find(filter);
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
