require('dotenv').config();
const Sequelize = require('sequelize');


const sequelize = new Sequelize('techblog_db','root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

  module.exports = sequelize;