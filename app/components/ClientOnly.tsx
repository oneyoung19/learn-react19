import { useEffect } from 'react'

export function ClientOnly() {
  useEffect(() => {
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      import('../plugins/react-scan')
      import('../plugins/react-grab')
    }
  }, [])

  return null
}
