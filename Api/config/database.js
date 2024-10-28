const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'postgres', 'tJewwQPAcVsGdUgYskBqanhhySzmLJMx', {
  host: 'junction.proxy.rlwy.net', // Database host
  port: '31805',
  dialect: 'postgres', // Database type (e.g., 'mysql', 'postgres')
});

module.exports = sequelize;