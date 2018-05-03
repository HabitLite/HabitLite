const User = require('./user')
const DefaultHabit = require('./defaultHabit')
const CustomHabit = require('./customHabit')
const Category = require('./category')
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
Category.hasMany(DefaultHabit)
DefaultHabit.belongsTo(Category)
User.hasMany(CustomHabit)
CustomHabit.belongsTo(User)
Category.hasMany(CustomHabit)
CustomHabit.belongsTo(Category)

module.exports = {
  User,
  DefaultHabit,
  Category,
  CustomHabit
}
