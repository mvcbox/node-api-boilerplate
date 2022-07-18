import { container } from '../../../container';
import { Sequelize, DataTypes } from 'sequelize';
import { UserSessionModelName } from './UserSessionModelName';
import { UserSessionModelInstance } from './UserSessionModelInstance';
import { UserSessionModelTableName } from './UserSessionModelTableName';
import { UserSessionModelStatusEnum } from './UserSessionModelStatusEnum';

const sequelize = container.resolve<Sequelize>(Sequelize);

export const UserSessionModel = sequelize.define<UserSessionModelInstance>(UserSessionModelName, {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: '_id'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id'
  },
  authToken: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'auth_token'
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'refresh_token'
  },
  permissions: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'permissions'
  },
  lastActivity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'last_activity'
  },
  client: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'client'
  },
  status: {
    type: DataTypes.ENUM(
      UserSessionModelStatusEnum.ACTIVE,
      UserSessionModelStatusEnum.EXPIRED,
      UserSessionModelStatusEnum.TERMINATED
    ),
    allowNull: false,
    field: 'status'
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
  tableName: UserSessionModelTableName
});
