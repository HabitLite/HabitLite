
const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Habit