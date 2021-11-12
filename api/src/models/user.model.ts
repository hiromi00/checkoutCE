import {Entity, model, property, hasOne} from '@loopback/repository';
import {ShoppingSession} from './shopping-session.model';
import {OrderDetails} from './order-details.model';

@model({
  settings: {
    mysql: {
      table: 'users'
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 20
    },
    mysql: {
      columnName: 'username',
      dataType: 'varchar',
      dataLength: 20,
      nullable: 'N'
    }
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 255
    },
    mysql: {
      columnName: 'password',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'N'
    }
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      pattern: /^[ \w - \d \.]+@([\w-]+\.)+[\w-]{2,4}$/.source,
    },
    mysql: {
      columnName: 'email',
      dataType: 'varchar',
      dataLength: 255,
      nullable: 'N'
    }
  })
  email: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 100
    },
    mysql: {
      columnName: 'name',
      dataType: 'varchar',
      dataLength: 100,
    }
  })
  name?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 100
    },
    mysql: {
      columnName: 'lastname',
      dataType: 'varchar',
      dataLength: 100,
    }
  })
  lastname?: string;

  @property({
    type: 'string',
    jsonSchema: {
      maxLength: 255
    },
    mysql: {
      columnName: 'address',
      dataType: 'varchar',
      dataLength: 255,
    }
  })
  address?: string;

  @property({
    type: 'date',
    default: Date.now
  })
  created_at?: string;
  
  @property({
    type: 'date',
    default: Date.now
  })
  updated_at?: string;

  @hasOne(() => ShoppingSession, {keyTo: 'user_id'})
  shoppingSession: ShoppingSession;

  @hasOne(() => OrderDetails, {keyTo: 'user_id'})
  orderDetails: OrderDetails;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
