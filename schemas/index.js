const joi = require('joi')

module.exports = {
  addMeme: {
    body: {
      image: joi.string().base64().required(),
      type: joi.string().required()
    }
  },
  getMeme: {
    params: {
      id: joi.string().uuid().required()
    }
  },
  updateMeme: {
    body: {
      image: joi.string().base64().required(),
      type: joi.string().required()
    },
    params: {
      id: joi.string().uuid().required()
    }
  }
}
