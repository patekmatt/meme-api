const express = require('express')

const addMeme = require('./lib/getMeme')
const getMeme = require('./lib/getMeme')
const removeMeme = require('./lib/removeMeme')
const updateMeme = require('./lib/updateMeme')

const app = express()
const port = 3000

app.route('/meme/:id')
  .delete(removeMeme)
  .get(getMeme)
  .post(addMeme)
  .put(updateMeme)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
