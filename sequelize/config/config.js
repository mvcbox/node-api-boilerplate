'use strict';

const { config } = require('../../dist/config');

module.exports = {
  production: {
    ...config.database.replication.write,
    dialect: config.database.dialect,
    ssl: config.database.ssl
  },
  development: {
    ...config.database.replication.write,
    dialect: config.database.dialect,
    ssl: config.database.ssl
  }
};
