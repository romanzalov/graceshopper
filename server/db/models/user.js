const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  address: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  addressList: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.completePurchase = async function() {
  var oldCart = await Order.findById(this.cart.id);
  oldCart.userId = this.id;
  await oldCart.save();
  var newCart = await Order.create({});
  newCart.cartuserId = this.id;
  await newCart.save();
}

User.beforeCreate(user => {
  Order.create({
    userId: user.id
  }).then(cart => {
    cart.userId = user.id;
    cart.save().then(() => {
      return;
    });
  });
});

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
