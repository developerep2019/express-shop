const Sequelize = require('sequelize');
const sequelize = require('../utilities/database');

const cartItemModel = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = cartItemModel;