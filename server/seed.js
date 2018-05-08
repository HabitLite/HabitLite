const db = require('../server/db')
const {User, Category, Habit, UserCategory} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'tania@gmail.com', password: '123', username: 'tania'}),
    User.create({email: 'ginny@gmail.com', password: '123', username: 'ginny'}),
    User.create({email: 'palina@email.com', password: '123', username: 'palina'}),
    User.create({email: 'priya@email.com', password: '123', username: 'priya', XP: 100, level: 4}),
    User.create({email: 'cody@email.com', password: '123', username: 'cody'}),
    User.create({email: 'murphy@email.com', password: '123', username: 'dops'})
  ])

  const category = await Promise.all([
    Category.create({name: 'Eat Healthy'}),
    Category.create({name: 'Increase Physical Activity'}),
    Category.create({name: 'Code more, become a code ninja'})
  ])

  const habit = await Promise.all([
    Habit.create({description: 'Eat broccoli', categoryId: 1, userId: 1}),
    Habit.create({description: 'Avoid Pasta', categoryId: 1, userId: 2}),
    Habit.create({description: 'Drink water instead of soda', categoryId: 1, userId: 3}),
    Habit.create({description: 'Eat more snacks', categoryId: 1, userId: 4}),
    Habit.create({description: 'Do Yoga', categoryId: 2, userId: 1}),
    Habit.create({description: 'Do 10 situps', categoryId: 2, userId: 2}),
    Habit.create({description: 'Do a tech talk', categoryId: 3, userId: 2}),
    Habit.create({description: 'Complete 10k codewars', categoryId: 3, userId: 4})
  ])

  const userCategory = await Promise.all([
    UserCategory.create({userId: 4, categoryId: 1, XP: 100})
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${category.length} categories`)
  console.log(`seeded ${habit.length} habits`)
  console.log(`seeded ${userCategory.length} userHabits`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })


/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
