const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/d/habit', require('./defaultHabit'))
router.use('/c/habit', require('./customHabit'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
