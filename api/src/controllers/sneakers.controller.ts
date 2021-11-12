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
import {Sneakers} from '../models';
import {SneakersRepository} from '../repositories';

export class SneakersController {
  constructor(
    @repository(SneakersRepository)
    public sneakersRepository : SneakersRepository,
  ) {}

  /* @post('/sneakers')
  @response(200, {
    description: 'Sneakers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sneakers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sneakers, {
            title: 'NewSneakers',
            exclude: ['id'],
          }),
        },
      },
    })
    sneakers: Omit<Sneakers, 'id'>,
  ): Promise<Sneakers> {
    return this.sneakersRepository.create(sneakers);
  } */

  @get('/sneakers')
  @response(200, {
    description: 'Array of Sneakers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sneakers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sneakers) filter?: Filter<Sneakers>,
  ): Promise<Sneakers[]> {
    filter = {"include": ["sizes"]};
    return this.sneakersRepository.find(filter);
  }

  
  @get('/sneakers/{id}')
  @response(200, {
    description: 'Sneakers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sneakers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sneakers, {exclude: 'where'}) filter?: FilterExcludingWhere<Sneakers>
    ): Promise<Sneakers> {
    filter = {"include": ["sizes"]};
    return this.sneakersRepository.findById(id, filter);
  }

  /* @patch('/sneakers/{id}')
  @response(204, {
    description: 'Sneakers PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sneakers, {partial: true}),
        },
      },
    })
    sneakers: Sneakers,
  ): Promise<void> {
    await this.sneakersRepository.updateById(id, sneakers);
  } */

  /* @del('/sneakers/{id}')
  @response(204, {
    description: 'Sneakers DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sneakersRepository.deleteById(id);
  } */
}
