import express from 'express'
import cors from 'cors'
import { createDatabase } from './database/connection'
import { carreraRouter } from './routes/carrera'
import { alumnRouter } from './routes/alumn'

const PORT = 3000

const app = express()

app.use(express.json())
app.use(cors())

// create database
createDatabase()

app.use('/carrera', carreraRouter)
app.use('/alumn', alumnRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})