/**
 * @author: steven
 * @date: 17/04/20
 */

switch (process.env.NODE_ENV) {
  case 'pro':
  case 'production':
    module.exports = require('./config/webpack.config.pro');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.config.dev');
}
