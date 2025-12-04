import { useCallback, useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'

/**
 * 实践总结
 * 在 useEffect 中使用了 state 和 props 都要声明依赖数组
 * 在 useEffect 中更新 state 的时候，可以通过函数式更新
 * 在 useEffect 中使用回调函数，要配合 useCallback，(1、声明依赖数组，重复的绑定新回调函数有可能造成性能浪费 2、因此可以利用useRef产生一个稳定的闭包引用)
 *
 */
export default function EventListener() {
  const [count, setCount] = useState(0)

  const countRef = useRef(count)

  // 保持 countRef 与 count 同步
  useEffect(() => {
    countRef.current = count
  }, [count])

  const handleDocumentClicked = useCallback(() => {
    console.log('document clicked', countRef.current) // 使用 ref 访问最新值
  }, []) // 空依赖数组，函数只创建一次

  useEffect(() => {
    window.addEventListener('click', handleDocumentClicked)
    return () => {
      window.removeEventListener('click', handleDocumentClicked)
    }
  }, [handleDocumentClicked]) // 依赖不会变化，事件监听器只添加一次

  const handleIncrement = event => {
    // React的时间绑定原理是利用了document冒泡
    // DOM原生事件 → 先被浏览器原生冒泡 → document → React 捕获此事件 → 触发 onClick → window
    // event.nativeEvent.stopPropagation()
    event.stopPropagation()
    setCount(count + 1)
  }

  return (
    <div>
      <h2>EventListener</h2>
      <p>当前Count: {count}</p>
      <Button
        variant="outline"
        onClick={handleIncrement}>
        Increment
      </Button>
    </div>
  )
}

// 每次都重复创建handleDocumentClicked函数了 性能浪费 优化方案使用useRef
// export default function EventListener() {
// 	const [count, setCount] = useState(0)

// 	const handleDocumentClicked = useCallback(() => {
// 		console.log('document clicked', count)
// 	}, [count])

// 	useEffect(() => {
// 		window.addEventListener('click', handleDocumentClicked)
// 		return () => {
// 			window.removeEventListener('click', handleDocumentClicked)
// 		}
// 	}, [handleDocumentClicked])

//   const handleIncrement = (event) => {
// 		// React的时间绑定原理是利用了document冒泡
// 		// DOM原生事件 → 先被浏览器原生冒泡 → document → React 捕获此事件 → 触发 onClick → window
//     // event.nativeEvent.stopPropagation()
// 		event.stopPropagation()
//     setCount(count + 1)
//   }

//   return (
//     <div>
//       <h2>EventListener</h2>
// 			<p>当前Count: {count}</p>
//       <Button variant="outline" onClick={handleIncrement}>Increment</Button>
//     </div>
//   )
// }
