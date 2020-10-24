const express = require('express')

const {
  addMeme, getMeme, removeMeme, updateMeme
} = require('./lib/service')

const app = express()
app.use(express.json())
const port = 3000

app.route('/meme')
  .post(addMeme)

app.route('/meme/:id')
  .delete(removeMeme)
  .get(getMeme)
  .put(updateMeme)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
