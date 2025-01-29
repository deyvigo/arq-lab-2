import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'

export const Layout = () => {
  return (
    <main className="flex gap-4 w-full h-full">
      <SideBar />
      <Outlet />
    </main>
  )
}