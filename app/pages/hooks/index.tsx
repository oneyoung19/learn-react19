import { Link, Outlet } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Hooks - React Router App' },
    { name: 'description', content: 'Hooks page' }
  ]
}

export default function Hooks() {
  return (
    <div>
      <h1>Hooks</h1>
      <nav className="mb-6 border-b">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/hooks/use-state"
              className="px-4 py-2 hover:underline">
              useState
            </Link>
          </li>
          <li>
            <Link
              to="/hooks/use-effect"
              className="px-4 py-2 hover:underline">
              useEffect
            </Link>
          </li>
          <li>
            <Link
              to="/hooks/use-context"
              className="px-4 py-2 hover:underline">
              useContext
            </Link>
          </li>
          <li>
            <Link
              to="/hooks/use-ref"
              className="px-4 py-2 hover:underline">
              useRef
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
