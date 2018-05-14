const db = require('../server/db')
const { User, Category, Habit, UserCategory, UserHabit } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')


  const users = await Promise.all([
    User.create({ email: 'tania@gmail.com', password: '123', username: 'tania', level: 1 }),
    User.create({ email: 'ginny@gmail.com', password: '123', username: 'ginny', level: 1 }),
    User.create({ email: 'palina@email.com', password: '123', username: 'palina', level: 1 }),
    User.create({ email: 'priya@email.com', password: '123', username: 'priya', level: 1 }),
    User.create({ email: 'cody@email.com', password: '123', username: 'cody', level: 1 }),
    User.create({ email: 'murphy@email.com', password: '123', username: 'dops', level: 1 })


  ])

  const categories = await Promise.all([
    Category.create({ name: 'Eat Healthy' }),
    Category.create({ name: 'Increase Physical Activity' }),
    Category.create({ name: 'Code more, become a code ninja' })
  ])

  const habits = await Promise.all([
    Habit.create({ description: 'Eat broccoli', habitGroup: "Default", categoryId: 1, userId: 1 }),
    Habit.create({ description: 'Avoid Pasta', habitGroup: "Default", categoryId: 1, userId: 2 }),
    Habit.create({ description: 'Drink water instead of soda', habitGroup: "Default", categoryId: 1, userId: 3 }),
    Habit.create({ description: 'Eat more snacks', habitGroup: "Default", categoryId: 1, userId: 4 }),
    Habit.create({ description: 'Do Yoga', habitGroup: "Default", categoryId: 2, userId: 1 }),
    Habit.create({ description: 'Do 10 situps', habitGroup: "Default", categoryId: 2, userId: 2 }),
    Habit.create({ description: 'Do a tech talk', habitGroup: "Default", categoryId: 3, userId: 2 }),
    Habit.create({ description: 'Complete 10k codewars', habitGroup: "Default", categoryId: 3, userId: 4 }),
    Habit.create({ description: 'Eat a new vegetabe today', habitGroup: "ChallengeD", categoryId: 1 }),
    Habit.create({ description: 'Complete a eating rockstar challenge', habitGroup: "ChallengeD", categoryId: 1 }),
    Habit.create({ description: 'Cook and share a meal for a loved one', habitGroup: "LoveD", categoryId: 1 }),
    Habit.create({ description: 'Trade a new healthy recipe in community forum', habitGroup: "LoveD", categoryId: 1 }),
    Habit.create({ description: 'Eat a hearty breakfast', habitGroup: "StructureD", categoryId: 1 }),
    Habit.create({ description: 'Have 5 small meals instead of 3 big meals today', habitGroup: "StructureD", categoryId: 1 })
  ])

  const userCategories = await Promise.all([
    UserCategory.create({userId: 4, categoryId: 1, XP: 1, HP: 123}),
    UserCategory.create({userId: 1, categoryId: 1, XP: 0, HP: 234}),
    UserCategory.create({userId: 2, categoryId: 1, XP: 0, HP: 345}),
    UserCategory.create({userId: 3, categoryId: 1, XP: 0, HP: 456}),
    UserCategory.create({userId: 5, categoryId: 1, XP: 0, HP: 567}),
    UserCategory.create({userId: 6, categoryId: 1, XP: 0, HP: 678}),
    UserCategory.create({userId: 4, categoryId: 3, XP: 0, HP: 123}),
    UserCategory.create({userId: 1, categoryId: 3, XP: 0, HP: 234}),
    UserCategory.create({userId: 2, categoryId: 3, XP: 0, HP: 345}),
    UserCategory.create({userId: 3, categoryId: 2, XP: 0, HP: 456}),
    UserCategory.create({userId: 5, categoryId: 2, XP: 0, HP: 567}),
    UserCategory.create({userId: 6, categoryId: 2, XP: 0, HP: 678}),
    UserCategory.create({userId: 1, categoryId: 2, XP: 0, HP: 234}),
    UserCategory.create({userId: 4, categoryId: 2, XP: 0, HP: 234})
  ])

  const userHabit = await Promise.all([
    UserHabit.create({ userId: 4, habitId: 13, XP: 100, HP: 123 }),
    UserHabit.create({ userId: 1, habitId: 14, XP: 1, HP: 234 }),
    UserHabit.create({ userId: 2, habitId: 1, XP: 0, HP: 345 }),
    UserHabit.create({ userId: 3, habitId: 2, XP: 0, HP: 456 }),
    UserHabit.create({ userId: 5, habitId: 3, XP: 0, HP: 567 }),
    UserHabit.create({ userId: 6, habitId: 4, XP: 0, HP: 678 })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${habits.length} habit`)
  console.log(`seeded ${userCategories.length} userCategories`)
  console.log(`seeded ${userHabit.length} userHabits`)
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
