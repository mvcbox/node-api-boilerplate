import { container } from '../../../container';
import { UserModelName } from './UserModelName';
import { Sequelize, DataTypes } from 'sequelize';
import { UserModelInstance } from './UserModelInstance';
import { UserModelTableName } from './UserModelTableName';
import { UserModelStatusEnum } from './UserModelStatusEnum';

const sequelize = container.resolve<Sequelize>(Sequelize);

export const UserModel = sequelize.define<UserModelInstance>(UserModelName, {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: '_id'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'email'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'username'
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'options'
  },
  status: {
    type: DataTypes.ENUM(
      UserModelStatusEnum.ACTIVE,
      UserModelStatusEnum.BLOCKED,
      UserModelStatusEnum.DISABLED,
      UserModelStatusEnum.CONFIRMATION_PENDING
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
  tableName: UserModelTableName
});
