const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    sportType: {
      type: Sequelize.ENUM,
      values: ['Football', 'Basketball', 'Baseball', 'Combat Sports', 'Tennis', 'Soccer', 'Hockey', 'Volleyball', 'Snowboarding', 'Swimming'],
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    price: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
    }
})

Product.search = function(name) {
  return Product.findAll(
    {
      where: {
          title: name
      }
  })
}

Product.searchbyCategory = function(category) {
  return Product.findAll(
    {
      where: {
          sportType: category
      }
  })
}

module.exports = Product;
