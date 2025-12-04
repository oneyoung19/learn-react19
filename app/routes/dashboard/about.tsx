import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "关于 - Dashboard" },
    { name: "description", content: "关于页面" },
  ];
}

export default function DashboardAbout() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">关于</h2>
      <p className="text-gray-700 dark:text-gray-300">
        这是 Dashboard 的关于页面，展示嵌套路由的使用。
      </p>
    </div>
  );
}

