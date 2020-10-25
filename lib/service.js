const AWS = require('aws-sdk')
const uuid = require('uuid').v4
const _ = require('lodash')
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
      res.status(500).json({
        message: 'Internal Server Error'
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
      res.status(500).json({
        message: 'Internal Server Error'
      })
    } else {
      res
        .status(200)
        .set('Content-Type', 'image/jpeg')
        .send(data.Body)
    }
  })
}

exports.randomMeme = (req, res) => {
  const params = {
    Bucket: S3_BUCKET
  }

  s3Client.listObjects(params, (err, data) => {
    if (err) {
      res.send(err.message)
    } else {
      const id = _.sample(data.Contents).Key
      this.getMeme({ params: { id } }, res)
    }
  })
}

exports.removeMeme = (req, res) => {
  const { id } = req.params
  const params = {
    Bucket: S3_BUCKET,
    Key: id
  }

  s3Client.deleteObject(params, (err, data) => {
    if (err) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    } else {
      res
        .status(200)
        .json({
          status: 'success',
          id
        })
    }
  })
}

exports.updateMeme = (req, res) => {
  const { id } = req.params
  const { image, type } = req.body

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
      res.status(200).json({
        status: 'success',
        id
      })
    }
  })
}
