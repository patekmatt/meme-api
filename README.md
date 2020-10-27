# meme-api

A RESTful microservice for performing CRUD operations on a meme, as well as getting random memes.

## setup

`npm install` - install dependencies

`PORT=<PORT> npm start` - run server locally, defaults to port 3000

You also need to define a `.env` file with the following variables:

- `AWS_ACCESS_KEY` - accessKeyId
- `AWS_SECRET_KEY` - secretKey
- `AWS_S3_BUCKET` - name of AWS S3 bucket

## endpoints

- `POST /meme`
- `GET /memes`
- `GET /memes/random`
- `DELETE /meme/:id`
- `GET /meme/:id`
- `PUT /meme/:id`
