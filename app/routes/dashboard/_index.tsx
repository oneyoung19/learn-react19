import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "概览 - Dashboard" },
    { name: "description", content: "Dashboard 概览页面" },
  ];
}

export default function DashboardIndex() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">概览</h2>
      <p className="text-gray-700 dark:text-gray-300">
        这是 Dashboard 的默认页面，当访问 /dashboard 时显示。
      </p>
    </div>
  );
}

