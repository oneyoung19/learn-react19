import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "routes/dashboard.tsx", [
    index("routes/dashboard/_index.tsx"),
    route("about", "routes/dashboard/about.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
  ]),
] satisfies RouteConfig;
