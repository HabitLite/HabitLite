const db = require('../server/db')
const {User, Category, DefaultHabit, CustomHabit} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

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
  const defaultHabit = await Promise.all([
    DefaultHabit.create({description: 'Have a well-balanced diet', categoryId: 1}),
    DefaultHabit.create({description: 'Eat plenty of whole grains, fruit and vegetables but little fat', categoryId: 1}),
    DefaultHabit.create({description: 'Drink at least eight glasses of water every day', categoryId: 1}),
    DefaultHabit.create({description: 'Eat three regular meals a day', categoryId: 1}),
    DefaultHabit.create({description: 'limit salt and sugar', categoryId: 1}),
    DefaultHabit.create({description: 'Avoid junk food such as crisps and sweets', categoryId: 1}),
    DefaultHabit.create({description: 'Do not eat too much of any single food', categoryId: 1}),
    DefaultHabit.create({description: 'Avoid food with a lot of artificial flavours, colours or chemicals', categoryId: 1}),
    DefaultHabit.create({description: 'Walk for 30 minutes', categoryId: 2}),
    DefaultHabit.create({description: 'Do 10 pushups', categoryId: 2}),
    DefaultHabit.create({description: 'Dance for 10 minutes', categoryId: 2}),
    DefaultHabit.create({description: 'Research a new technology', categoryId: 3}),
    DefaultHabit.create({description: 'Complete one codewars', categoryId: 3}),
    DefaultHabit.create({description: 'Explain Recursion to a 10 year old', categoryId: 3}),
    DefaultHabit.create({description: 'Do a testing spec for a model and the model', categoryId: 3})
  ])
  const customHabit = await Promise.all([
    CustomHabit.create({description: 'Eat broccoli', categoryId: 1, userId: 1}),
    CustomHabit.create({description: 'Avoid Pasta', categoryId: 1, userId: 2}),
    CustomHabit.create({description: 'Drink water instead of soda', categoryId: 1, userId: 3}),
    CustomHabit.create({description: 'Eat more snacks', categoryId: 1, userId: 4}),
    CustomHabit.create({description: 'Do Yoga', categoryId: 2, userId: 1}),
    CustomHabit.create({description: 'Do 10 situps', categoryId: 2, userId: 2}),
    CustomHabit.create({description: 'Do a tech talk', categoryId: 3, userId: 2}),
    CustomHabit.create({description: 'Complete 10k codewars', categoryId: 3, userId: 4})
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
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

// -------
// const Promise = require('bluebird');
// const db = require('./db/db.js')
// const { DefaultHabit, User, Category, CustomHabit } = require('./db/models')

// const user = [
//     {
//         email: "tania@gmail.com",
//         password: "123",
//         username: "tania"
//     },
//     {

//         email: "ginny@gmail.com",
//         password: "123",
//         username: "ginny"
//     },
//     {

//         email: "palina@gmail.com",
//         password: "123",
//         username: "palina"
//     },
//     {

//         email: "priya@gmail.com",
//         password: "123",
//         username: "priya"
//     }
// ]

// const category = [
//     {
//         name: "Eat Healthy"
//     },
//     {
//         name: "Increase Physical Activity"
//     },
//     {
//         name: "Code more, become a code ninja"
//     },

// ]

// const defaultHabit = [
//     {
//         description: "Have a well-balanced diet",
//         categoryId: 1
//     },
//     {
//         description: "Eat plenty of whole grains, fruit and vegetables but little fat",
//         categoryId: 1
//     },
//     {
//         description: "Drink at least eight glasses of water every day",
//         categoryId: 1
//     },
//     {
//         description: " Eat three regular meals a day",
//         categoryId: 1
//     },
//     {
//         description: "limit salt and sugar",
//         categoryId: 1
//     },
//     {
//         description: "Avoid junk food such as crisps and sweets",
//         categoryId: 1
//     },
//     {
//         description: "Do not eat too much of any single food",
//         categoryId: 1
//     },
//     {
//         description: "Avoid food with a lot of artificial flavours, colours or chemicals",
//         categoryId: 1
//     },
//     {
//         description: "Walk for 30 minutes",
//         categoryId: 2
//     },
//     {
//         description: "Do 10 pushups",
//         categoryId: 2
//     },
//     {
//         description: "Dance for 10 minutes",
//         categoryId: 2
//     },
//     {
//         description: "Research a new technology",
//         categoryId: 3
//     },
//     {
//         description: "Complete one codewars",
//         categoryId: 3
//     },
//     {
//         description: "Explain Recursion to a 10 year old",
//         categoryId: 3
//     },
//     {
//         description: "Do a testing spec for a model and the model",
//         categoryId: 3
//     }
// ]

// const customHabit = [
//     {
//         description: "Eat broccoli",
//         categoryId: 1,
//         userId: 1
//     },
//     {
//         description: "Avoid Pasta",
//         categoryId: 1,
//         userId: 2
//     },
//     {
//         description: "Drink water instead of soda",
//         categoryId: 1,
//         userId: 3
//     },
//     {
//         description: " Eat more snacks",
//         categoryId: 1,
//         userId: 4
//     },
//     {
//         description: "Do Yoga",
//         categoryId: 2,
//         userId: 1
//     },
//     {
//         description: "Do 10 situps",
//         categoryId: 2,
//         userId: 2
//     },
//     {
//         description: "Run for 45 min",
//         categoryId: 2,
//         userId: 3
//     },
//     {
//         description: "Do a tech talk",
//         categoryId: 3,
//         userId: 2
//     },
//     {
//         description: "Complete 10k codewars",
//         categoryId: 3,
//         userId: 4
//     }
// ]


// const seed = () =>
//     Promise.all(user.map(user =>
//         User.create(user)
//     ))
//         .then(() =>
//             Promise.all(category.map(category =>
//                 Category.create(category)
//             )))
//         .then(() =>
//             Promise.all(defaultHabit.map(defaultHabit =>
//                 DefaultHabit.create(defaultHabit)
//             )))
//         .then(() =>
//             Promise.all(customHabit.map(customHabit =>
//                 CustomHabit.create(customHabit)
//             )))
//         .catch(err => {
//             console.error(err)
//             console.log('create failed');
//         })


// const main = () => {
//     db.sync({ force: true })
//         .then(() => {
//             console.log('seeding the database');
//             return seed()
//         })
//         .catch(err => {
//             console.log(err.stack)
//         })
//         .then(() => {
//             db.close();
//             return null;
//         })
// }

// main();
