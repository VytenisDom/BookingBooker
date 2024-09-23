const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_development_2mqs', 'vytenis', 'm0Nmsxw18lnUBztaugbpKmkcHygFPckL', {
  host: 'dpg-cropi4i3esus73c5jlmg-a', // Database host
  dialect: 'postgres', // Database type (e.g., 'mysql', 'postgres')
});

module.exports = sequelize;
