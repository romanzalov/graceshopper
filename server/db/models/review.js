const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review',{
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: {
        args: [5],
        msg: 'Display name must be more than 5 characters in length'
      }
		}
	},
	stars: {
		type: Sequelize.RANGE(Sequelize.INTEGER),
		validate: {
			max: 5,
			min: 1
		}
	}
})

module.exports = Review
