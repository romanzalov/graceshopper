const Sequelize = require('sequelize')
const db = require('../db');
const productInstance = require('./productInstance')
const Product = require('./product')

const Order = db.define('order', {
	isCart: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	status: {
		type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
	},
	information: {
		type: Sequelize.JSON,
		defaultValue: {},
	}
}, {
	defaultScope: {
		include: [{
			model: productInstance, as: 'instances',
			required: false,
			include: [
				{
					model: Product
				}
			]
		}]
	},
})

Order.searchByStatus = status => {
	return Order.findAll({
		where: {status}
	})
}

module.exports = Order;
