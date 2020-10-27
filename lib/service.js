const AWS = require('aws-sdk')
const uuid = require('uuid').v4
const _ = require('lodash')

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

/**
 * @description Adds a new meme to the S3 bucket, generating a new uuid
 * @param {String} req.body.image base64 encoded image
 * @param {String} req.body.type image file type
 */
exports.addMeme = (req, res, next) => {
  const newReq = _.merge(req, {
    params: {
      id: uuid()
    }
  })
  this.updateMeme(newReq, res, next)
}

/**
 * @description Retrieves ids for all memes in S3 bucket
 */
exports.getAllMemes = (req, res, next) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET
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

/**
 * @description Retrieves a meme with the specified id
 * @param {String} req.params.id uuid corresponding to the key of the meme
 */
exports.getMeme = (req, res, next) => {
  const { id } = req.params
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
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

/**
 * @description Returns a random meme to the client
 */
exports.randomMeme = (req, res, next) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET
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

/**
 * @description Removes a meme with the specified id
 * @param {String} req.params.id uuid corresponding to the key of the meme
 */
exports.removeMeme = (req, res, next) => {
  const { id } = req.params
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
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

/**
 * @description Updates a meme with the specified id
 * @param {String} req.params.id uuid corresponding to the key of the meme
 * @param {String} req.body.image base64 encoded image
 * @param {String} req.body.type image file type
 */
exports.updateMeme = (req, res, next) => {
  const { id } = req.params
  const { image, type } = req.body

  const params = {
    Body: Buffer.from(image, 'base64'),
    Bucket: process.env.AWS_S3_BUCKET,
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
