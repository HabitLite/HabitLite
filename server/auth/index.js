const router = require('express').Router()
const { User, UserCategory } = require('../db/models')
module.exports = router

const giveUserXPAndHPAccordingToCategories = (user, categories) => {
  let userXP = 0
  let userHP = 0
  categories.forEach(category => {
    userXP += category.XP
    userHP += category.HP
  })

  return {
    id: user.id,
    avatar: user.avatar,
    email: user.email,
    username: user.username,
    levelId: user.levelId,
    lives: user.lives,
    XP: userXP,
    HP: userHP
  }
}

router.post('/login', (req, res, next) => {

  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {

        UserCategory.findAll({
          where: {
            userId: user.id
          }
        })
          .then(categories => {
              const updatedUser = giveUserXPAndHPAccordingToCategories(user, categories)
              req.login(updatedUser, err => (err ? next(err) : res.json(updatedUser)))
            }
          )
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
    UserCategory.findAll({
      where: {
        userId: req.user.id
      }
    })
    .then(categories => {
      const user = giveUserXPAndHPAccordingToCategories(req.user, categories)

      res.json(user)
    })
    // .catch(next)
  }

})

router.use('/google', require('./google'))
