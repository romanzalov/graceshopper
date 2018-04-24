const Sequelize = require('sequelize')
const db = require('../db')
const axios = require ('axios');
// const Product = require('./product');

const productInstance = db.define('productInstance', {

  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  }
})

module.exports = productInstance;
