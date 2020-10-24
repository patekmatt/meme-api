const uuid = require('uuid').v4

const S3 = require('./S3')

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
})

exports.addMeme = async (req, res) => {
  const { image, type } = req.body

  // await s3.putObject({
  //     key: `${uuid()}.${type}`,
  //     payload: Buffer.from(image, 'base64'),
  //     type: `image/${type}`
  //   })
  //   .then(res => console.log('ye'))
  //   .catch(err => console.log('no'))
  res.send('done')
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
