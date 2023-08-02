const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
  res.render('../public/views/index.html')
})

app.get('/login', (req, res) => {
  res.render('../public/views/login.html')
})

app.get('/signup', (req, res) => {
  res.render('../public/views/signup.html')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})