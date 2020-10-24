const AWS = require('aws-sdk')
const uuid = require('uuid').v4
require('dotenv').config()

const S3_BUCKET = 'meme-api'

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

exports.addMeme = (req, res) => {
  const { image, type } = req.body

  const id = uuid()

  const params = {
    Body: Buffer.from(image, 'base64'),
    Bucket: S3_BUCKET,
    Key: id,
    ContentType: `image/${type}`
  }

  s3Client.putObject(params, (err, data) => {
    if (err) {
      res.status(500).send({
        msg: err.message
      })
    } else {
      res.status(201).json({
        status: 'success',
        id
      })
    }
  })
}

exports.getMeme = (req, res) => {
  const { id } = req.params
  const params = {
    Bucket: S3_BUCKET,
    Key: id
  }

  s3Client.getObject(params, (err, data) => {
    if (err) {
      res.status(500).send('oh no')
    } else {
      res.status(200).send(data.Body)
    }
  })
}

exports.removeMeme = (req, res) => {
  res.send('yo')
}

exports.updateMeme = (req, res) => {
  res.send('yo')
}
