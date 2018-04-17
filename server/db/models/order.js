const Sequelize = require('sequelize')
const db = require('../db');
const productInstance = require('./productInstance')

const Order = db.define('order', {
	isCart: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	status: {
		type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
	}
}, {
	defaultScope: {
		include: [{
			model: productInstance
		}]
	}
})

module.exports = Order;
