const AWS = require('aws-sdk')

const S3_BUCKET = 'meme-api'

class S3 {
  constructor ({ accessKeyId, secretAccessKey }) {
    this.api = new AWS.S3({
      accessKeyId,
      secretAccessKey
    })
  }

  // deleteObject (key) {
  //   const params = {
  //     Bucket: S3_BUCKET,
  //     Key: `${key}.html`
  //   }

  //   return new Promise((resolve, reject) => {
  //     this.api.deleteObject(params, (err, data) => {
  //       if (err) reject(new Error('INTERNAL_SERVER_ERROR'))
  //       resolve(data)
  //     })
  //   })
  // }

  // getObject ({ key, type }) {
  //   const params = {
  //     Bucket: S3_BUCKET,
  //     Key: key,
  //     ResponseContentType: type
  //   }

  //   return new Promise((resolve, reject) => {
  //     this.api.getObject(params, (err, data) => {
  //       if (err) reject(new Error('INTERNAL_SERVER_ERROR'))
  //       else resolve(data.Body)
  //     })
  //   })
  // }

  async putObject ({ key, payload, type }) {
    const params = {
      Body: payload,
      Bucket: S3_BUCKET,
      Key: key,
      ContentType: type
    }

    return this.api.putObject(params, (err, data) => {
      if (err) throw new Error(err)
      return data
    })
  }
}

module.exports = S3
