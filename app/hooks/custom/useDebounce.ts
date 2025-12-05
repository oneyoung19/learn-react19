/**
 * 题目2：useDebounce (中等)
 *
 * 要求：
 * 1. 创建一个 useDebounce hook，用于防抖处理
 * 2. 接受一个值和延迟时间（毫秒）
 * 3. 返回防抖后的值
 * 4. 当值在延迟时间内频繁变化时，只在最后一次变化后的延迟时间后更新返回值
 * 5. 组件卸载时需要清理定时器
 *
 * 使用示例：
 * const [input, setInput] = useState('')
 * const debouncedValue = useDebounce(input, 500)
 * // 当用户快速输入时，debouncedValue 只在停止输入 500ms 后更新
 */
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  // 在这里实现你的代码
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}
