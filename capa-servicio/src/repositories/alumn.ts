import { connection } from '../database/connection'
import { AlumnCarrera } from '../interfaces/alumn'

export class AlumnRepository {
  async getAllByCarrera(idCarrera: string, page: number): Promise<AlumnCarrera[]> {
    const query = `
      SELECT *
      FROM alumn a
      INNER JOIN carrera c
      ON a.id_carrera = c.id_carrera
      WHERE a.color != 'rojo'
      AND a.edad BETWEEN 18 AND 25
      AND a.fecha_ingreso > '2021-01-01'
      AND c.id_carrera = ${idCarrera}
      LIMIT 10 OFFSET ${ ( page - 1 ) * 10 };
    `
    try {
      const [result] = await connection.query<AlumnCarrera[]>(query)
      return result
    } catch (error) {
      console.error('Error getting alumns', error)
      return []
    }
  }
}