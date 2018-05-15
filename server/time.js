const { UserHabit } = require('./db/models')
const schedule = require('node-schedule')

// const time = new Date()
//
// if (time.getHours() === 0 && time.getMinutes === 0){
//
// }

console.log("***********************************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!**********************!!!!!!!!!!!!!!!!")

schedule.scheduleJob('0 0 * * *', function(){
  console.log("DAISYDAISYDAISYDAISYDAISYDAISYDAISYDAISYDAISY")
  UserHabit.findAll()
    .then(habits => {
      habits.forEach(habit => {
        habit.complete = false;
        habit.save()
      })
    })
});

// console.log("TIME", new Date().getHours(), ":", new Date().getMinutes())

