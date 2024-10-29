import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'fanseb',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'fanseb',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class FansebDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'fanseb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.fanseb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
