import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'checkoutce',
  connector: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CheckoutceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'checkoutce';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.checkoutce', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
