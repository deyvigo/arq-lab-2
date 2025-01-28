import mysql from 'mysql2/promise'

import dotenv from 'dotenv'

dotenv.config()

export const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
})

export const createDatabase = async () => {
  const queryCarrera = `
    create table if not exists carrera (
      id_carrera int               not null auto_increment primary key,
      codigo varchar(10)           not null,
      nombre varchar(50)           not null,
      fecha_creacion date          not null,
      observaciones varchar(255)   not null
    );
  `

  const queryAlumn = `
    create table if not exists alumn (
      id_alumno int                not null auto_increment primary key,
      codigo varchar(10)           not null,
      apellidos varchar(50)        not null,
      nombres varchar(50)          not null,
      edad int                     not null,
      sexo varchar(10)             not null,
      peso float                   not null,
      talla float                  not null,
      color varchar(10)            not null,
      provincia varchar(10)        not null,
      fecha_ingreso date           not null,
      id_carrera int               not null,
      constraint alumn_carrera_id_carrera_fk
        foreign key (id_carrera) references carrera (id_carrera)
    );
  `

  try {
    await connection.query(queryCarrera)
    await connection.query(queryAlumn)
  } catch (error) {
    console.error('Error creating database', error)
  }
}
