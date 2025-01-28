import express, { Request, Response } from 'express'
import { CarreraRepository } from '../repositories/carrera'

export const carreraRouter = express.Router()

const carreraRepository = new CarreraRepository()

carreraRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const carreras = await carreraRepository.getAll()
    res.send(carreras)
  } catch (error) {
    res.status(500).send({ message: 'Error getting carreras' })
  }
})

carreraRouter.get('/all/count/:page', async (req: Request, res: Response) => {
  const { page } = req.params
  try {
    const carreras = await carreraRepository.getAllCount(parseInt(page))
    res.send(carreras)
  } catch (error) {
    res.status(500).send({ message: 'Error getting carreras count' })
  }
})