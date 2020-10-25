const express = require('express')

const {
  addMeme, getMeme, randomMeme, removeMeme, updateMeme
} = require('./lib/service')

const app = express()
app.use(express.json({ limit: '50mb' }))
const port = 3000

app.post('/meme', addMeme)
app.get('/meme/random', randomMeme)
app.route('/meme/:id')
  .delete(removeMeme)
  .get(getMeme)
  .put(updateMeme)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
