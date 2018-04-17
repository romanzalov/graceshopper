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

// productInstance.beforeCreate(instance => {
//     // var productResponse = await axios.get(`/api/products/${instance.productId}`, { proxy: { host: '127.0.0.1', port: 5000 } });
//     // var product = productResponse.data;
//     // if (parseFloat(instance.price) == 0) {
//     //   // console.log("Product", Product);
//     instance.price = 20;
//     return Product.findById(instance.productId).then(product => {
//         instance.price = product.price;
//     });
//     //   });
//     // }
//     // return
// });

module.exports = productInstance;
