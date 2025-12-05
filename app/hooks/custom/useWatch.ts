import { useEffect, useRef } from 'react'

/**
 * useWatch - 监听值变化的 hook
 *
 * 功能：
 * 1. 监听单个或多个值的变化
 * 2. 值变化时执行回调函数
 * 3. 回调函数可以获取旧值和新值
 * 4. 支持立即执行（immediate）
 * 5. 支持深度比较（deep）
 *
 * 使用示例：
 * // 监听单个值
 * useWatch(count, (newVal, oldVal) => {
 *   console.log('count changed:', oldVal, '->', newVal)
 * })
 *
 * // 监听多个值
 * useWatch([count, name], ([newCount, newName], [oldCount, oldName]) => {
 *   console.log('values changed')
 * })
 *
 * // 立即执行
 * useWatch(count, callback, { immediate: true })
 *
 * // 深度监听对象
 * useWatch(obj, callback, { deep: true })
 */

export interface UseWatchOptions {
  immediate?: boolean // 是否立即执行回调
  deep?: boolean // 是否深度监听（使用深度比较）
}

// 深度比较函数
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a == null || b == null) return false
  if (typeof a !== 'object' || typeof b !== 'object') return false

  const objA = a as Record<string, unknown>
  const objB = b as Record<string, unknown>
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (!deepEqual(objA[key], objB[key])) return false
  }

  return true
}

// 单个值监听

export function useWatch<T>(
  source: T,
  callback: (newVal: T, oldVal: T | undefined) => void,
  options?: UseWatchOptions
): void

// 多个值监听
// eslint-disable-next-line no-redeclare
export function useWatch<T extends readonly unknown[]>(
  source: T,
  callback: (newVal: T, oldVal: T | undefined) => void,
  options?: UseWatchOptions
): void

// eslint-disable-next-line no-redeclare
export function useWatch<T>(
  source: T,
  callback: (newVal: T, oldVal: T | undefined) => void,
  options: UseWatchOptions = {}
): void {
  const { immediate = false, deep = false } = options
  const oldValueRef = useRef<T | undefined>(undefined)
  const isFirstRun = useRef(true)
  const callbackRef = useRef(callback)

  // 保持 callback 引用最新
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const newValue = source
    const oldValue = oldValueRef.current

    // 判断值是否变化
    let hasChanged = false
    if (deep && typeof source === 'object' && source !== null) {
      hasChanged = !deepEqual(newValue, oldValue)
    } else {
      hasChanged = newValue !== oldValue
    }

    // 首次执行且 immediate 为 true，或者值发生变化
    if (isFirstRun.current) {
      if (immediate) {
        callbackRef.current(newValue, undefined)
      }
      isFirstRun.current = false
    } else if (hasChanged) {
      callbackRef.current(newValue, oldValue)
    }

    // 更新旧值
    oldValueRef.current =
      deep && typeof source === 'object' && source !== null
        ? JSON.parse(JSON.stringify(source)) // 深拷贝
        : source
  }, [source, deep, immediate])
}
