import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sizes} from './sizes.model';
import {SneakersSizes} from './sneakers-sizes.model';

@model({
  settings: {
    mysql: {
      table: 'sneakers'
    },
  },
})
export class Sneakers extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'id',
      dataType: 'int',
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 100,
      default: ''
    },
    mysql: {
      columnName: 'model',
      dataType: 'varchar',
      dataLength: 100,
      nullable: 'N'
    }
  })
  model: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0.0,
      maximum: 9999.0, 
      default: 0
    },
    mysql: {
      columnName: 'price',
      dataType: 'float',
      dataPrecision: 9,
      dataScale: 2,
      nullable: 'N'
    }
  })
  price: number;

  @property({
    type: 'string',
  })
  image_path?: string;

  @property({
    type: 'date',
    default: Date.now,
    mysql: {
      default: Date.now
    }
  })
  created_at: string;

  @property({
    type: 'date',
    default: Date.now,
  })
  updated_at: string;

  @hasMany(() => Sizes, {through: {model: () => SneakersSizes, keyFrom: 'sneaker_id', keyTo: 'size_id'}})
  sizes: Sizes[];

  constructor(data?: Partial<Sneakers>) {
    super(data);
  }
}

export interface SneakersRelations {
  // describe navigational properties here
}

export type SneakersWithRelations = Sneakers & SneakersRelations;
