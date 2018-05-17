const db = require('../server/db');
const {
  User,
  Category,
  Habit,
  UserCategory,
  UserHabit
} = require('../server/db/models');

const faker = require('faker');

const userCreatePromisesArray = () => {
  const userCreatePromiseCreator = i => {
    return User.create({
      id: i,
      email: faker.fake('{{name.firstName}}@email.com'),
      password: '123',
      username: faker.fake('{{name.firstName}}'),
      level: Math.floor(Math.random() * 100)
    });
  };

  const promises = [];

  for (let i = 2; i < 5; i++) {
    promises.push(userCreatePromiseCreator(i));
  }
  console.log(promises)
  return promises;
};

userCreatePromisesArray()