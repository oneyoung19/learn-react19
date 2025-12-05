/**
 * 题目3：useRequest (困难)
 *
 * 要求：
 * 1. 创建一个 useRequest hook，用于处理异步请求
 * 2. 接受一个异步函数作为参数
 * 3. 返回 { data, loading, error, run } 对象
 * 4. data: 请求成功的数据
 * 5. loading: 请求进行中的状态
 * 6. error: 请求失败的错误信息
 * 7. run: 手动触发请求的函数
 * 8. 组件挂载时自动执行一次请求
 * 9. 组件卸载时如果请求还在进行中，需要取消请求（避免内存泄漏）
 * 10. 支持手动调用 run 函数重新发起请求
 *
 * 使用示例：
 * const { data, loading, error, run } = useRequest(async () => {
 *   const res = await fetch('/api/users')
 *   return res.json()
 * })
 */

export interface UseRequestResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  run: () => void
}

export function useRequest<T>(
  requestFn: () => Promise<T>
): UseRequestResult<T> {
  // 在这里实现你的代码
  requestFn()
  return {}
}
