import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/home.tsx'),
  route('hooks', 'pages/hooks/index.tsx')
] satisfies RouteConfig
