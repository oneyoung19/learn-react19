import { useState } from 'react'
import { Button } from '@/components/ui/button'

/**
 * useState
 * useEffect
 * useContext
 * useReducer
 * useCallback
 * useMemo
 * useRef
 * useImperativeHandle
 * useLayoutEffect
 * useDebugValue
 *
 */
/**
 * 需要 useCallback 的场景：
 * - 子组件使用了 React.memo，且函数作为 prop 传递   const MemoizedButton = React.memo(Button)
 * - 函数在 useEffect、useMemo、useCallback 的依赖数组中
 * - 函数创建成本很高（复杂计算）
 */
export function BuiltInHooks() {
  const [count, setCount] = useState(0)
  const handleIncrement = () => {
    setCount(count + 1)
    console.log('handleIncrement')
  }
  return (
    <div>
      <h2>Built-in Hooks</h2>
      <Button
        variant="outline"
        onClick={handleIncrement}>
        Increment
      </Button>
      <p>Count: {count}</p>
    </div>
  )
}
