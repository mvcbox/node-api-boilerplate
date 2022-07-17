import { container } from '../../../container';
import { Sequelize, DataTypes } from 'sequelize';
import { _TemplateModelName } from './_TemplateModelName';
import { _TemplateModelInstance } from './_TemplateModelInstance';
import { _TemplateModelTableName } from './_TemplateModelTableName';

const sequelize = container.resolve<Sequelize>(Sequelize);

export const _TemplateModel = sequelize.define<_TemplateModelInstance>(_TemplateModelName, {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: '_id'
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
  tableName: _TemplateModelTableName
});
