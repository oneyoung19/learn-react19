import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('pages/home.tsx'),
  route('hooks', 'pages/hooks/index.tsx'),
  route('closure', 'pages/closure/index.tsx', [
    route('timeout', 'pages/closure/Timeout.tsx'),
    route('eventlistener', 'pages/closure/EventListener.tsx')
  ])
] satisfies RouteConfig
