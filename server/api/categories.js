const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

//Get all theCustom habits
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
})