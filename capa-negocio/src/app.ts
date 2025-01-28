import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = 4000
const SERVICE_URL = process.env.SERVICE_URL

const app = express()

app.use(express.json())

app.get('/carrera/all', async (req: Request, res: Response) => {
  const response = await fetch(`${SERVICE_URL}/carrera/all`)
  const data = await response.json()
  res.send(data)
})

app.get('/carrera/all/count/:page', async (req: Request, res: Response) => {
  const { page } = req.params

  const pageNumber = parseInt(page)
  if (isNaN(pageNumber) || pageNumber < 1) {
    res.status(400).send({ message: 'Page number must be a number greater than 0' })
    return
  }

  const response = await fetch(`${SERVICE_URL}/carrera/all/count/${page}`)
  const data = await response.json()
  res.send(data)
})

app.get('/alumn/carrera/:id_carrera/page/:page', async (req: Request, res: Response) => {
  const { id_carrera, page } = req.params

  const pageNumber = parseInt(page)
  if (isNaN(pageNumber) || pageNumber < 1) {
    res.status(400).send({ message: 'Page number must be a number greater than 0' })
    return
  }

  const idCarrera = parseInt(id_carrera)
  if (isNaN(idCarrera) || idCarrera < 1) {
    res.status(400).send({ message: 'Id carrera must be a number greater than 0' })
    return
  }

  const response = await fetch(`${SERVICE_URL}/alumn/carrera/${id_carrera}/page/${page}`)
  const data = await response.json()
  res.send(data)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
