import { RowDataPacket } from 'mysql2'
import { Carrera } from './carrera'

export interface Alumn extends RowDataPacket {
  id_alumno: string,
  codigo: string,
  apellidos: string,
  nombres: string,
  edad: number,
  sexo: 'masculino' | 'femenino',
  peso: number,
  talla: number,
  color: string,
  provincia: string,
  fecha_ingreso: Date,
  id_carrera: string,
}

export type AlumnCarrera = Alumn & Carrera
