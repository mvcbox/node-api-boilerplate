import { UserModel } from '../domain/models/UserModel';
import { LogGroupModel } from '../domain/models/LogGroupModel';
import { UserSessionModel } from '../domain/models/UserSessionModel';
import { LogGroupRecordModel } from '../domain/models/LogGroupRecordModel';

UserModel.hasMany(UserSessionModel, {
  as: 'userSessions',
  foreignKey: 'user_id'
});
UserSessionModel.belongsTo(UserModel, {
  as: 'user',
  targetKey: '_id'
});

LogGroupModel.hasMany(LogGroupRecordModel, {
  as: 'logGroupRecords',
  foreignKey: 'log_group_id'
});
LogGroupRecordModel.belongsTo(LogGroupModel, {
  as: 'logGroup',
  targetKey: '_id'
});
