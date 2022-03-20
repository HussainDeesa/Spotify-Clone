const express = require('express')
const path = require('path')
const connectToMongo = require('./db')
const app = express()
const port = process.env.PORT||7000

connectToMongo();
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index')
})
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/login.html'))
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/signup.html'))
})

app.listen(port, () => {
  console.log(`Spotify app listening on port ${port}`)
})
