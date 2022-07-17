import { Sequelize } from 'sequelize';
import { Container } from 'plain-ioc';
import { config } from '../../../config';

export function configure(container: Container) {
  container.bindSingleton(Sequelize, function(): Sequelize {
    return new Sequelize(config.database);
  });
}
