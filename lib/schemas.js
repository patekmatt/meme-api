const joi = require('joi')

module.exports = {
  addMeme: {
    body: joi.object({
      image: joi.string().base64().required(),
      type: joi.string().required()
    })
  },
  getMeme: {
    params: joi.object({
      id: joi.string().uuid().required()
    })
  },
  updateMeme: {
    body: joi.object({
      image: joi.string().base64().required(),
      type: joi.string().required()
    }),
    params: joi.object({
      id: joi.string().uuid().required()
    })
  }
}
