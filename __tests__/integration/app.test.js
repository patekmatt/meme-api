const fs = require('fs')
const request = require('supertest')

const app = require('../../app')

// test data
const MEME_1_ID = '22c6d341-0269-453e-8902-e11bcbcd42d7'
const MEME_2_ID = '543798a9-9c4b-435f-834a-74f20ae122b9'

const meme1 = fs.readFileSync(`${__dirname}/data/meme_1.jpeg`)
const meme2 = fs.readFileSync(`${__dirname}/data/meme_2.jpeg`)

describe('GET /meme/:id', () => {
  it('should return a meme', async () => {
    const res = await request(app).get(`/meme/${MEME_1_ID}`)
    const actual = Buffer.from(res.body, 'base64')
    expect(res.status).toEqual(200)
    expect(actual).toEqual(meme1)
  })
})
