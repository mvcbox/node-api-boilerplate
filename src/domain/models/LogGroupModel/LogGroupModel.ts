import { container } from '../../../container';
import { Sequelize, DataTypes } from 'sequelize';
import { LogGroupModelName } from './LogGroupModelName';
import { LogGroupModelInstance } from './LogGroupModelInstance';
import { LogGroupModelTableName } from './LogGroupModelTableName';

const sequelize = container.resolve<Sequelize>(Sequelize);

export const LogGroupModel = sequelize.define<LogGroupModelInstance>(LogGroupModelName, {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: '_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  },
  initializedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'initialized_at'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  }
}, {
  //underscored: true,
  tableName: LogGroupModelTableName
});
