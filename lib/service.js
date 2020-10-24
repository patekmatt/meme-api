const S3 = require('./S3')

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

exports.addMeme = (req, res) => {
  res.send('yo')
}

exports.getMeme = (req, res) => {
  res.send('yo')
}

exports.removeMeme = (req, res) => {
  res.send('yo')
}

exports.updateMeme = (req, res) => {
  res.send('yo')
}
