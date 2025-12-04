import type { Route } from "./+types/dashboard";
import { Link, Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - React Router App" },
    { name: "description", content: "Dashboard page" },
  ];
}

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <nav className="mb-6 border-b">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/dashboard"
              className="px-4 py-2 hover:underline"
            >
              概览
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/about"
              className="px-4 py-2 hover:underline"
            >
              关于
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="px-4 py-2 hover:underline"
            >
              设置
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}

