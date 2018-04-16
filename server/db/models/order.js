const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	userOrGuest: {
		type: Sequelize.ENUM('user', 'guest'),
	},
	isCart: {
		type: Sequelize.BOOLEAN,
	},
	status: {
		type: Sequelize.ENUM('open', 'filled'),
	}
})

module.exports = Order;
