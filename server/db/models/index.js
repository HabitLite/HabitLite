const User = require('./user')
const CustomHabit = require('./customHabit')
const Category = require('./category')
const User_Habit = require('./userHabit')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
// User.hasMany(CustomHabit)
// CustomHabit.belongsTo(User)
Category.hasMany(CustomHabit)
CustomHabit.belongsTo(Category)
User_Habit.belongsTo(User)
User_Habit.belongsTo(CustomHabit)
User.hasMany(User_Habit)
CustomHabit.hasMany(User_Habit)

//Make user to habit many to many (and have an XP field and an HP field for habit associated with particular user in join table)
//Have Level table with id, level number, and XP needed to get to that level (or to get to next level)
//Virtual field in user table for total user XP (added from all the individual user's habits' XPs)

module.exports = {
  User,
  Category,
  CustomHabit,
  User_Habit
}
