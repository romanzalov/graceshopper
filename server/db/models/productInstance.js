const Sequelize = require('sequelize')
const db = require('../db')

const productInstance = db.define('productInstance', {
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  }
})

module.exports = productInstance;
