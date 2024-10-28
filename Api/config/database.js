const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'postgres', 'tJewwQPAcVsGdUgYskBqanhhySzmLJMx', {
  host: 'junction.proxy.rlwy.net:31805', // Database host
  dialect: 'postgres', // Database type (e.g., 'mysql', 'postgres')
});

module.exports = sequelize;