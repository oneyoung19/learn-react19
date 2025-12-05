/**
 * 题目1：useToggle (简单)
 *
 * 要求：
 * 1. 创建一个 useToggle hook，用于切换布尔值
 * 2. 返回当前值和切换函数
 * 3. 支持传入初始值（可选，默认为 false）
 * 4. 支持直接设置值（toggle 函数可以接受一个布尔值参数）
 *
 * 使用示例：
 * const [value, toggle] = useToggle(false)
 * toggle() // 切换值
 * toggle(true) // 设置为 true
 * toggle(false) // 设置为 false
 */
import { useState } from 'react'
export function useToggle(initialValue?: boolean) {
  const [toggle, setToggle] = useState(initialValue)
  // 在这里实现你的代码
  return [
    toggle,
    value => setToggle(typeof value === 'boolean' ? value : !toggle)
  ]
}
