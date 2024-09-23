const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development', 'postgres', 'mopsas555', {
  host: 'localhost', // Database host
  dialect: 'postgres', // Database type (e.g., 'mysql', 'postgres')
});

module.exports = sequelize;
