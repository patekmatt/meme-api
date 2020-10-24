const express = require('express')

const getMeme = require('./lib/getMeme')

const app = express()
const port = 3000

app.route('/meme')
  .get(getMeme)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
