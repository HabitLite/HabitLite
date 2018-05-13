const router = require('express').Router()
const { User, UserCategory, UserHabit } = require('../db/models')
module.exports = router

const getUser = user => {
  let userXP = 0
  let userHP = 0
  user.userCategories.forEach(category => {
    userXP += category.XP
    userHP += category.HP
  })

  return user.getProgress(userXP, user.levelId).then(progress => {
    return {
      id: user.id,
      avatar: user.avatar,
      email: user.email,
      username: user.username,
      progress: progress,
      levelId: user.levelId,
      lives: user.lives,
      XP: userXP,
      HP: userHP,
      categories: user.userCategories,
      habits: user.userHabits
    }
  })

}

router.post('/login', (req, res, next) => {

  User.findOne({
    where: {email: req.body.email},
    include: [UserCategory, UserHabit]
    })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {

        getUser(user)
          .then(updatedUser => {
            req.login(updatedUser, err => (err ? next(err) : res.json(updatedUser)))

          })
          // .catch(next)
      }
    })
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  if (req.user) {
    Promise.all([
      UserCategory.findAll({
        where: {
          userId: req.user.id
        }
      }),
      UserHabit.findAll({
        where: {
          userId: req.user.id
        }
      })
    ])
    .then(([categories, habits]) => {
      getUser({...req.user, userCategories: categories, userHabits: habits})
    })
    .then(user => res.json(user))
  }
})
    // .catch(next)

router.use('/google', require('./google'))
