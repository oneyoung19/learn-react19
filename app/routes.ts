import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/home.tsx'),
  route('dashboard', 'pages/dashboard.tsx', [
    index('pages/dashboard/_index.tsx'),
    route('about', 'pages/dashboard/about.tsx'),
    route('settings', 'pages/dashboard/settings.tsx')
  ]),
  route('hooks', 'pages/hooks/index.tsx')
] satisfies RouteConfig
