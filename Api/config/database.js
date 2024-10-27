const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('verceldb', 'default', 'DuV6r0odyOjM', {
  host: 'ep-raspy-haze-a4vjiwdc.us-east-1.aws.neon.tech', // Database host
  dialect: 'postgres', // Database type (e.g., 'mysql', 'postgres')
});

module.exports = sequelize;