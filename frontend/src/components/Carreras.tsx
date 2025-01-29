import { useEffect, useState } from 'react'
import { Table } from './Table'
import { URL } from '../service/api'
import { useNavigate, useParams } from 'react-router-dom'

const titles = [
  'Código',
  'Carrera',
  'Fecha de Creación',
  'Observaciones',
  'Cantidad de Alumnos'
]

export const Carreras = () => {
  const [data, setData] = useState<any[]>([])
  const { page } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getCarreraCountPerPage = async (page: string) => {
      const data = await fetch(`${URL}/carrera/all/count/${page}`)
      const json = await data.json()
      const filteredData = json.map((d: any) => ({
        codigo: d.codigo,
        nombre: d.nombre,
        fecha_creacion: new Date(d.fecha_creacion).toLocaleDateString(),
        observaciones: d.observaciones,
        cantidad_alumnos: d.cantidad_alumnos
      }))
      setData(filteredData)
    }
    getCarreraCountPerPage(page as string)
  }, [page])

  const navigateNextPage = () => {
    const nextPage = parseInt(page as string) + 1
    navigate(`/first/${nextPage}`)
  }

  const navigatePreviousPage = () => {
    if (parseInt(page as string) === 1) return
    const previousPage = parseInt(page as string) - 1
    navigate(`/first/${previousPage}`)
  }

  return (
    <section className="flex flex-col gap-4 py-16">
      <h1 className="text-4xl font-bold">Carreras</h1>
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
