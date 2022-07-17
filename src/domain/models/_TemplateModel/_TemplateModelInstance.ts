import { Model } from 'sequelize';
import { _TemplateModelProperties } from './_TemplateModelProperties';

export interface _TemplateModelInstance extends Model<_TemplateModelProperties>, _TemplateModelProperties {}
