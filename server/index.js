import express from 'express'
import dotenv from 'dotenv'
import { connect } from './db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connect()

const app = express()

// Middleware setup
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.json({ message: 'You did it you good sir!' })
})

app.use('/api/login', authRoutes)

// Everything was set up, now listen for requests
const port = process.env.TODO_API_PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
