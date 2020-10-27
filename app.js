const express = require('express')
const morgan = require('morgan')
const { validate, ValidationError } = require('express-validation')
require('dotenv').config()

const {
  addMeme, getAllMemes, getMeme, randomMeme, removeMeme, updateMeme
} = require('./lib/service')
const schemas = require('./lib/schemas')

const app = express()
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))

const port = 3000

app.post('/meme', validate(schemas.addMeme), addMeme)
app.get('/memes', getAllMemes)
app.get('/meme/random', randomMeme)
app.route('/meme/:id')
  .delete(validate(schemas.getMeme), removeMeme)
  .get(validate(schemas.getMeme), getMeme)
  .put(validate(schemas.updateMeme), updateMeme)

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }
  return res.status(500).json({
    status: 'fail',
    message: 'Internal Server Error'
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
