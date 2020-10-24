const express = require('express')

const {
  addMeme, getMeme, removeMeme, updateMeme
} = require('./lib/service')

const app = express()
app.use(express.json())
const port = 3000

app.post('/meme', addMeme)
app.route('/meme/:id')
  .delete(removeMeme)
  .get(getMeme)
  .put(updateMeme)
// app.get('/meme/random', randomMeme)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
