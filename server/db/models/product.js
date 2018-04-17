const Sequelize = require('sequelize')
const db = require('../db')
const productInstance = require('./productInstance');

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
    price: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
    },
    imageUrls: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      // allowNull: true,
      defaultValue: [],
    },
    availability: {
      type: Sequelize.BOOLEAN,
    },
    content: {
      type: Sequelize.TEXT,
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

Product.prototype.createInstance = function(priceDiff, orderId=null) {
  //- 1 from quantity?
  console.log("creating product instace with price: ", parseFloat(this.price + priceDiff));
  return productInstance.create({
      productId: this.id,
      orderId,
      price: parseFloat(this.price) + priceDiff,
  });
}

module.exports = Product;
