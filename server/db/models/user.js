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
  resetPassword: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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

User.prototype.getPurchaseHistory = async function () {
  var oldOrders = await Order.findAll(
    {
      where: {
        userId:this.id, 
        isCart:false} //status == 'Completed?
    });
  return oldOrders;
}

User.prototype.findCart = function() {
  console.log("finding cart...");
  return cart = Order.findOne({
    where: {
      userId:this.id,
      isCart:true,
    }
  });
}

User.stashCarts = async function() {
  var linkedOrders = await Order.findAll({
    where: {
      where: {
        userId:this.id,
      }
    }
  });
  for (var i = 0; i < linkedOrders.length; i ++) {
    linkedOrders[i].isCart = false;
    await linkedOrders[i].save();
  }
}


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
