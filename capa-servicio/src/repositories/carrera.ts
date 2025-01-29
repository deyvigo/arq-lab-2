import { connection } from '../database/connection'
import { Carrera, CarreraCount } from '../interfaces/carrera'

export class CarreraRepository {
  async getAll(): Promise<Carrera[]> {
    const query = `
      SELECT *
      FROM carrera;
    `
    try {
      const [result] = await connection.query<Carrera[]>(query)
      return result
    } catch (error) {
      console.error('Error getting carreras', error)
      return []
    }
  }

  async getAllCount(page: number): Promise<CarreraCount[]> {
    const query = `
      SELECT COUNT(a.id_carrera) as cantidad_alumnos, c.codigo, c.nombre, c.fecha_creacion, c.observaciones
      FROM carrera c
      JOIN alumn a ON c.id_carrera = a.id_carrera
      GROUP BY c.id_carrera
      LIMIT 10 OFFSET ${( page - 1 ) * 10}
    `
    try {
      const [result] = await connection.query<CarreraCount[]>(query)
      return result
    } catch (error) {
      console.error('Error getting carreras count', error)
      return []
    }
  }
}