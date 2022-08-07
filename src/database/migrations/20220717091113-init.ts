import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export async function up(queryInterface: QueryInterface, _Sequelize: typeof Sequelize) {
  // -------------------------------------------------------------------------------------------------------------------

  await queryInterface.createTable('user', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: '_id'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash'
    },
    options: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'options'
    },
    status: {
      type: DataTypes.ENUM(
        'ACTIVE',
        'BLOCKED',
        'DISABLED',
        'CONFIRMATION_PENDING'
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
  });

  await queryInterface.addIndex('user', [
    'email'
  ], {
    name: 'user__uindex__email',
    unique: true
  });

  await queryInterface.addIndex('user', [
    'username'
  ], {
    name: 'user__uindex__username',
    unique: true
  });

  // -------------------------------------------------------------------------------------------------------------------

  await queryInterface.createTable('user_session', {
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
        'ACTIVE',
        'EXPIRED',
        'TERMINATED'
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
  });

  await queryInterface.addConstraint('user_session', {
    name: 'user_session__2__user__fk',
    type: 'foreign key',
    fields: ['user_id'],
    references: {
      table: 'user',
      field: '_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // -------------------------------------------------------------------------------------------------------------------

  await queryInterface.createTable('log_group', {
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
  });

  await queryInterface.addIndex('log_group', [
    'name'
  ], {
    name: 'log_group__index__name'
  });

  // -------------------------------------------------------------------------------------------------------------------

  await queryInterface.createTable('log_group_record', {
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
  });

  await queryInterface.addIndex('log_group_record', [
    'name'
  ], {
    name: 'log_group_record__index__name'
  });

  await queryInterface.addIndex('log_group_record', [
    'is_error'
  ], {
    name: 'log_group_record__index__is_error'
  });

  await queryInterface.addConstraint('log_group_record', {
    name: 'log_group_record__2__log_group__fk',
    type: 'foreign key',
    fields: ['log_group_id'],
    references: {
      table: 'log_group',
      field: '_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // -------------------------------------------------------------------------------------------------------------------
}

export async function down(queryInterface: QueryInterface, _Sequelize: typeof Sequelize) {
  // -------------------------------------------------------------------------------------------------------------------
  await queryInterface.removeConstraint('log_group_record', 'log_group_record__2__log_group__fk');
  await queryInterface.removeIndex('log_group_record', 'log_group_record__index__is_error');
  await queryInterface.removeIndex('log_group_record', 'log_group_record__index__name');
  await queryInterface.dropTable('log_group_record');
  // -------------------------------------------------------------------------------------------------------------------
  await queryInterface.removeIndex('log_group', 'log_group__index__name');
  await queryInterface.dropTable('log_group');
  // -------------------------------------------------------------------------------------------------------------------
  await queryInterface.removeConstraint('user_session', 'user_session__2__user__fk');
  await queryInterface.dropTable('user_session');
  await queryInterface.sequelize.query('DROP TYPE "enum_user_session_status"');
  // -------------------------------------------------------------------------------------------------------------------
  await queryInterface.removeIndex('user', 'user__uindex__username');
  await queryInterface.removeIndex('user', 'user__uindex__email');
  await queryInterface.dropTable('user');
  await queryInterface.sequelize.query('DROP TYPE "enum_user_status"');
  // -------------------------------------------------------------------------------------------------------------------
}
