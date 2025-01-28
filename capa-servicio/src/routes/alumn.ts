import express, { Request, Response } from 'express'
import { AlumnRepository } from '../repositories/alumn'

export const alumnRouter = express.Router()

const alumnRepository = new AlumnRepository()

alumnRouter.get('/carrera/:id_carrera/page/:page', async (req: Request, res: Response) => {
  try {
    const { id_carrera, page } = req.params
    const alumns = await alumnRepository.getAllByCarrera(id_carrera, parseInt(page))
    res.send(alumns)
  } catch (error) {
    res.status(500).send({ message: 'Error getting alumns' })
  }
})