const { UserHabit, Habit, UserCategory } = require('./db/models');
const schedule = require('node-schedule');

// const time = new Date()
//
// if (time.getHours() === 0 && time.getMinutes === 0){
//
// }


/* *** RESETTING ALL HABITS AT MIDNIGHT *** */
schedule.scheduleJob('0 0 * * *', function() {

  UserHabit.findAll({
    include: [Habit]
  })
    .then(habits => {
      habits.forEach(userHabit => {
        if (userHabit.complete === false) {

          UserCategory.find({
            where: {
              categoryId: userHabit.habit.categoryId,
              userId: userHabit.userId
            }
          })
        .then(userCategory => {

          userCategory.HP -= 5

          userCategory.save()
        })
      }
      userHabit.complete = false;
      userHabit.save();
    });
  });
});

// console.log("TIME", new Date().getHours(), ":", new Date().getMinutes())
