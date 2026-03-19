const express = require('express')
require('dotenv').config()
const db = require('./database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (username !== process.env.USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const passwordMatch = bcrypt.compareSync(password, process.env.PASSWORD)
  
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
  { username },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
)

  return res.json({ token })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})