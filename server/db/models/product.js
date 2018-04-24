const Sequelize = require('sequelize')
const db = require('../db')
const productInstance = require('./productInstance');
const Category = require('./category');

const Product = db.define('product', {
    // sportType: {
    //   type: Sequelize.ENUM,
    //   values: ['Football', 'Basketball', 'Baseball', 'Combat Sports', 'Tennis', 'Soccer', 'Hockey', 'Volleyball', 'Snowboarding', 'Swimming'],
    //   allowNull: true,
    // },
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
      defaultValue: ['https://picsum.photos/700/400'],
    },
    availability: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    description: {
      type: Sequelize.TEXT,
    }
}, {
  getterMethods: {
    lowercaseTitle() {
      return this.title.toLowerCase();
    }
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

Product.findByName = function(name) {
  return Product.findAll({
      where: {
        title: {
          $iLike: '%' + name.toLowerCase() + '%',
        },
      }
  })
}

Product.prototype.createInstance = function(priceDiff=0, orderId=null, quantity=1) {
  //- 1 from quantity?
  console.log("creating product instance with price: ", parseFloat(this.price + priceDiff), orderId, quantity);
  productInstance.create({
      productId: this.id,
      price: parseFloat(this.price) + priceDiff,
      quantity,
  }).then(instance => {
    instance.setOrder(orderId);
    return instance.save();
  });
}

module.exports = Product;
