const AWS = require('aws-sdk')
const uuid = require('uuid').v4
const _ = require('lodash')

const S3_BUCKET = 'meme-api'

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

exports.addMeme = (req, res, next) => {
  const newReq = _.merge(req, {
    params: {
      id: uuid()
    }
  })
  this.updateMeme(newReq, res, next)
}

exports.getAllMemes = (req, res, next) => {
  const params = {
    Bucket: S3_BUCKET
  }

  s3Client.listObjects(params, (err, data) => {
    if (err) {
      next(err, req, res, next)
    } else {
      res.status(200).json({
        status: 'success',
        memes: data.Contents.map(d => d.Key)
      })
    }
  })
}

exports.getMeme = (req, res, next) => {
  const { id } = req.params
  const params = {
    Bucket: S3_BUCKET,
    Key: id
  }

  s3Client.getObject(params, (err, data) => {
    if (err && err.code === 'NoSuchKey') {
      res.status(404).json({
        status: 'fail',
        message: 'ID Not Found'
      })
    } else if (err) {
      next(err, req, res, next)
    } else {
      res.status(200).set('Content-Type', 'image/jpeg').send(data.Body)
    }
  })
}

exports.randomMeme = (req, res, next) => {
  const params = {
    Bucket: S3_BUCKET
  }

  s3Client.listObjects(params, (err, data) => {
    if (err) {
      next(err, req, res, next)
    } else {
      const id = _.sample(data.Contents).Key
      this.getMeme({ params: { id } }, res, next)
    }
  })
}

exports.removeMeme = (req, res, next) => {
  const { id } = req.params
  const params = {
    Bucket: S3_BUCKET,
    Key: id
  }

  s3Client.deleteObject(params, (err, data) => {
    if (err) {
      next(err, req, res, next)
    } else {
      res.status(200).json({
        status: 'success',
        id
      })
    }
  })
}

exports.updateMeme = (req, res, next) => {
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
      next(err, req, res, next)
    } else {
      res.status(200).json({
        status: 'success',
        id
      })
    }
  })
}
