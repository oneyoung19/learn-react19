import type { Route } from "../+types/dashboard.settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "设置 - Dashboard" },
    { name: "description", content: "设置页面" },
  ];
}

export default function DashboardSettings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">设置</h2>
      <p className="text-gray-700 dark:text-gray-300">
        这是 Dashboard 的设置页面，展示嵌套路由的使用。
      </p>
    </div>
  );
}

