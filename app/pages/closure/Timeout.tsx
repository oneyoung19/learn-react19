import { useEffect, useState } from 'react'

export default function Timeout() {
  const count = useTimeout()
  return (
    <div>
      <h2>Timeout</h2>
      <p>Count: {count}</p>
    </div>
  )
}

function useTimeout() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
      console.log('Count: ', count)
      // 由于依赖数组为空 useEffect只会在组件挂载时执行一次 从而产生闭包 count始终是0
      // 可以使用函数模式 setCount(count => count + 1) 解决闭包
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return count
}
