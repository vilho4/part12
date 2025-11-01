const express = require('express')
const router = express.Router()
const redis = require('../redis')

router.get('/', async (req, res) => {
  const count = await redis.getAsync('added_todos')
  res.json({
    added_todos: Number(count) || 0
  })
})

module.exports = router
