const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

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
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
    }
})

const productInstance = db.define('productInstance', {
  price: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  }
})

//productInstance.belongsTo(Product);

Product.search = function(name) {
  return Product.findAll(
    {
      where: {
          title:name
      }
  })
}

Product.searchbyCategory = function(category) {
  return Product.findAll(
    {
      where: {
          sportType:category
      }
  })
}

// const Cart = db.define('cart', {

// })

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  // cart: {
  //   currentOrder
  // }
}) 

// User to product
  //Purchase history

module.exports = db
