import { NavLink } from "react-router-dom"

interface LinkElement {
  name: string,
  path: string
}

const links: LinkElement[] = [
  {
    name: 'Carreras',
    path: '/first/1',
  },
  {
    name: 'Alumnos',
    path: '/second/1/1',
  }
]

export const SideBar = () => {
  return (
    <nav className="flex flex-col gap-4 min-w-[300px] h-full items-center px-2 py-16">
      {
        links.map((link: LinkElement) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="text-xl font-bold text-black w-[250px] h-auto rounded-lg bg-red-300 px-4 py-2 shadow-2xl"
          >
            {link.name}
          </NavLink>
        ))
      }
    </nav>
  )
}