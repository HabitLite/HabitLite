const User = require('./user')
const Habit = require('./habit')
const Category = require('./category')
const UserCategory = require('./userCategory')
const Personality = require('./personality')
const UserHabit = require('./userHabit')
const Level = require('./level')

Category.hasMany(Habit)
Habit.belongsTo(Category)
UserCategory.belongsTo(User)
UserCategory.belongsTo(Category)
User.hasMany(UserCategory)
Category.hasMany(UserCategory)
UserHabit.belongsTo(User)
UserHabit.belongsTo(Habit)
User.hasMany(UserHabit)
Habit.hasMany(UserHabit)
Personality.belongsTo(User)
User.hasOne(Personality)
User.belongsTo(Level, {
  constraints: {
    defaultValue: 1
  }
})
Level.hasMany(User, {
  constraints: {
    defaultValue: 1
  }
})


module.exports = {
  User,
  Category,
  Habit,
  UserCategory,
  Personality,
  UserHabit,
  Level
}
