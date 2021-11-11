import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      table: 'sneakers_sizes'
    },
  },
})
export class SneakersSizes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  sneaker_id?: number;

  @property({
    type: 'number',
  })
  size_id?: number;


  constructor(data?: Partial<SneakersSizes>) {
    super(data);
  }
}

export interface SneakersSizesRelations {
  // describe navigational properties here
}

export type SneakersSizesWithRelations = SneakersSizes & SneakersSizesRelations;
