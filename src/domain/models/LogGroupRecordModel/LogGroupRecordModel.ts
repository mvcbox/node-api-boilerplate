import { container } from '../../../container';
import { Sequelize, DataTypes } from 'sequelize';
import { LogGroupRecordModelName } from './LogGroupRecordModelName';
import { LogGroupRecordModelInstance } from './LogGroupRecordModelInstance';
import { LogGroupRecordModelTableName } from './LogGroupRecordModelTableName';

const sequelize = container.resolve<Sequelize>(Sequelize);

export const LogGroupRecordModel = sequelize.define<LogGroupRecordModelInstance>(LogGroupRecordModelName, {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: '_id'
  },
  logGroupId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'log_group_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  },
  value: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'value'
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'index'
  },
  isError: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_error'
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
  tableName: LogGroupRecordModelTableName
});
