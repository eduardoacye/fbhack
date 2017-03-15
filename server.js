const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const path = require('path')
const apiRouter = require('./server/api/router')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/fbhack')

const app = express()
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())

app.set('port', (process.env.PORT || 3001))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')))
}

app.use('/api', apiRouter)

app.listen(app.get('port'), () => {
  console.log(`FbHack server @ http://localhost:${app.get('port')}/`)
})
