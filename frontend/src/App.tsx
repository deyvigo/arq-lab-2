import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Carreras } from './components/Carreras'
import { Alumnos } from './components/Alumnos'

export const App = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="first/:page" element={<Carreras />} />
        <Route path="second/:carrera/:page" element={<Alumnos />} />
      </Route>
    </Routes>
  )
}
