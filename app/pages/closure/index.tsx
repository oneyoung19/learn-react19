import { Link, Outlet, redirect } from 'react-router'
import { Button } from '@/components/ui/button'
import type { Route } from './+types/index'

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  // 如果访问的是 /closure（没有子路径），重定向到 /closure/timeout
  if (url.pathname === '/closure' || url.pathname === '/closure/') {
    return redirect('/closure/timeout')
  }
  return null
}

export default function Closure() {
  return (
    <div>
      <h2>Closure</h2>
      {/* <div className="mb-2">
				<Button asChild>
					<Link to="/closure">Closure</Link>
				</Button>
			</div> */}
      <div className="flex gap-2">
        <Button asChild>
          <Link to="timeout">Timeout</Link>
        </Button>
        <Button asChild>
          <Link to="eventlistener">EventListener</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  )
}
