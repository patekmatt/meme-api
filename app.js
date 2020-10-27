const express = require('express')
const morgan = require('morgan')
const { validate, ValidationError } = require('express-validation')
require('dotenv').config()

const {
  addMeme,
  getAllMemes,
  getMeme,
  randomMeme,
  removeMeme,
  updateMeme
} = require('./lib/service')
const schemas = require('./lib/schemas')

// middleware
const app = express()
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))

const port = process.env.PORT || 3000

// routes
app.route('/memes').get(getAllMemes).post(validate(schemas.addMeme), addMeme)
app.get('/memes/random', randomMeme)
app
  .route('/memes/:id')
  .delete(validate(schemas.getMeme), removeMeme)
  .get(validate(schemas.getMeme), getMeme)
  .put(validate(schemas.updateMeme), updateMeme)

// default error function
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
})

// server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`App running on port ${port}...`)
  })
}

module.exports = app
