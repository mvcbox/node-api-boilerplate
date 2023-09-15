'use strict';

const { config } = require('../../dist/config');

module.exports = {
  production: {
    ...config.database.replication.write,
    dialect: config.database.dialect
  },
  development: {
    ...config.database.replication.write,
    dialect: config.database.dialect
  }
};
