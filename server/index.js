import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.TODO_API_PORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'You did it you good sir!' })
})