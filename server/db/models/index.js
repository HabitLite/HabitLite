const User = require('./user')
const Habit = require('./habit')
const Category = require('./category')
const UserHabit = require('./userHabit')

Category.hasMany(Habit)
Habit.belongsTo(Category)
UserHabit.belongsTo(User)
UserHabit.belongsTo(Habit)
User.hasMany(UserHabit)
Habit.hasMany(UserHabit)

//Have Level table with id, level number, and XP needed to get to that level (or to get to next level)
//Virtual field in user table for total user XP (added from all the individual user's habits' XPs)

module.exports = {
  User,
  Category,
  Habit,
  UserHabit
}
