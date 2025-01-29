import { useNavigate, useParams } from 'react-router-dom'
import { Table } from './Table'
import { URL } from '../service/api'
import { useState, useEffect } from 'react'

const titles = [
  'Nombres',
  'Apellidos',
  'Fecha de Ingreso',
  'Color Favorito',
  'Edad',
  'Carrera'
]

export const Alumnos = () => {
  const navigate = useNavigate()
  const { page, carrera } = useParams()
  const [data, setData] = useState<any[]>([])
  const [carreras, setCarreras] = useState<any[]>([])

  useEffect(() => {
    const getAlumnos = async (page: string, carrera: string) => {
      const data = await fetch(`${URL}/alumn/carrera/${carrera}/page/${page}`)
      const json = await data.json()
      const filteredData = json.map((d: any) => ({
        nombres: d.nombres,
        apellidos: d.apellidos,
        fecha_ingreso: new Date(d.fecha_ingreso).toLocaleDateString(),
        color_favorito: d.color,
        edad: d.edad,
        carrera: d.nombre
      }))
      setData(filteredData)
      console.log(filteredData)
    }

    getAlumnos(page as string, carrera as string)
  }, [page, carrera])

  useEffect(() => {
    const getCarreras = async () => {
      const data = await fetch(`${URL}/carrera/all`)
      const json = await data.json()
      const filteredData = json.map((d: any) => ({
        nombre: d.nombre,
        id: d.id_carrera
      }))
      setCarreras(filteredData)
    }

    getCarreras()
  }, [])

  const navigateNextPage = () => {
    const nextPage = parseInt(page as string) + 1
    navigate(`/second/${carrera}/${nextPage}`)
  }

  const navigatePreviousPage = () => {
    if (parseInt(page as string) === 1) return
    const previousPage = parseInt(page as string) - 1
    navigate(`/second/${carrera}/${previousPage}`)
  }

  const handleSelectChange = (e: any) => {
    navigate(`/second/${e.target.value}/${page}`)
  }

  return (
    <section className="flex flex-col gap-4 py-16">
      <div className="w-full flex justify-between h-auto">
        <h1 className="text-4xl font-bold">Alumnos</h1>
        <select
          onChange={handleSelectChange}
          className="outline-none border-[1px] px-2 rounded-lg"
        >
          {
            carreras.map((carrera) => (
              <option
                className="text-black" key={carrera.id} value={carrera.id}
              >
                { carrera.nombre }
              </option>
            ))
          }
        </select>
      </div>
      <Table data={data} titles={titles} />
      <div className="flex justify-center gap-2">
        <button
          onClick={navigatePreviousPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Anterior
        </button>
        <span
          className="w-[50px] h-[50px] flex items-center justify-center border-[1px] border-white rounded-lg font-bold"
        >
          { page }
        </span>
        <button
          onClick={navigateNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siguiente
        </button>
      </div>
    </section>
  )
}