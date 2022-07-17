import glob from 'glob';
import { container } from '../container';

[
  ...glob.sync(__dirname + '/container-configs-node-modules/**/*.js'), // node_modules first
  ...glob.sync(__dirname + '/container-configs/**/*.js')
].forEach(function(filePath) {
  const config = require(filePath);

  if (config && typeof config.configure === 'function') {
    config.configure(container);
  }
});
