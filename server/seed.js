const Promise = require('bluebird');
const db = require('./db/db.js')
const { DefaultHabit, User, Category, CustomHabit } = require('./db/models')

const user = [
    {
        username: "tania",
        password: 123
    },
    {
        username: "ginny",
        password: 123
    },
    {
        username: "palina",
        password: 123
    },
    {
        username: "priya",
        password: 123
    }
]

const category = [
    {
        name: "Eat Healthy"
    },
    {
        name: "Increase Physical Activity"
    },
    {
        name: "Code more, become a code ninja"
    },

]

const defaultHabit = [
    {
        description: "Have a well-balanced diet",
        categoryId: 1
    },
    {
        description: "Eat plenty of whole grains, fruit and vegetables but little fat",
        categoryId: 1
    },
    {
        description: "Drink at least eight glasses of water every day",
        categoryId: 1
    },
    {
        description: " Eat three regular meals a day",
        categoryId: 1
    },
    {
        description: "limit salt and sugar",
        categoryId: 1
    },
    {
        description: "Avoid junk food such as crisps and sweets",
        categoryId: 1
    },
    {
        description: "Do not eat too much of any single food",
        categoryId: 1
    },
    {
        description: "Avoid food with a lot of artificial flavours, colours or chemicals",
        categoryId: 1
    },
    {
        description: "Walk for 30 minutes",
        categoryId: 2
    },
    {
        description: "Do 10 pushups",
        categoryId: 2
    },
    {
        description: "Dance for 10 minutes",
        categoryId: 2
    },
    {
        description: "Research a new technology",
        categoryId: 3
    },
    {
        description: "Complete one codewars",
        categoryId: 3
    },
    {
        description: "Explain Recursion to a 10 year old",
        categoryId: 3
    },
    {
        description: "Do a testing spec for a model and the model",
        categoryId: 3
    }
]

const seed = () =>
    Promise.all(user.map(user =>
        User.create(user)
    ))
        .then(() =>
            Promise.all(category.map(category =>
                Category.create(category)
            )))
        .then(() =>
            Promise.all(defaultHabit.map(defaultHabit =>
                DefaultHabit.create(defaultHabit)
            )))
        .catch(err => {
            console.error(err)
            console.log('create failed');
        })


const main = () => {
    db.sync({ force: true })
        .then(() => {
            console.log('seeding the database');
            return seed()
        })
        .catch(err => {
            console.log(err.stack)
        })
        .then(() => {
            db.close();
            return null;
        })
}

main();