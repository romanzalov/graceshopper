const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review',{
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	stars: {
		type: Sequelize.INTEGER,
		validate: {
			max: 5,
			min: 1
		}
	}
})

module.exports = Review
