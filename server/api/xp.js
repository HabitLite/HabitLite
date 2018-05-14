const router = require('express').Router()
module.exports = router

router.put('/', async (req, res, next) => {
  await req.user.addXP(+req.body.categoryId, +req.body.incrXP)
  req.user.reload()
  res.json(req.user)

})
