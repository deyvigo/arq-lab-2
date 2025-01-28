import { RowDataPacket } from 'mysql2'

export interface Carrera extends RowDataPacket {
  id_carrera: string,
  codigo: string,
  nombre: string,
  fecha_creacion: Date,
  observaciones: string,
}

export interface CarreraCount extends Carrera {
  alumnos: number,
}