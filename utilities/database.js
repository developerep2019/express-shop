const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Admin@1677', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;