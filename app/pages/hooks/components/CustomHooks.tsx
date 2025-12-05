import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToggle } from '@/hooks/custom/useToggle'
import { useDebounce } from '@/hooks/custom/useDebounce'
import { useRequest } from '@/hooks/custom/useRequest'
import { useWatch } from '@/hooks/custom/useWatch'

export function CustomHooks() {
  return (
    <div className="space-y-8">
      <h2>Custom Hooks 练习题</h2>

      {/* 题目1：useToggle */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">题目1：useToggle (简单)</h3>
        <p className="text-sm text-gray-600 mb-4">
          实现一个 useToggle hook，用于切换布尔值。支持初始值和直接设置值。
        </p>
        <ToggleDemo />
      </div>

      {/* 题目2：useDebounce */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          题目2：useDebounce (中等)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          实现一个 useDebounce
          hook，用于防抖处理。当值频繁变化时，只在停止变化后的延迟时间后更新。
        </p>
        <DebounceDemo />
      </div>

      {/* 题目3：useRequest */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">题目3：useRequest (困难)</h3>
        <p className="text-sm text-gray-600 mb-4">
          实现一个 useRequest hook，用于处理异步请求。需要处理 loading、error
          状态，组件卸载时取消请求。
        </p>
        <RequestDemo />
      </div>

      {/* useWatch 演示 */}
      <div className="border p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">useWatch 演示</h3>
        <p className="text-sm text-gray-600 mb-4">
          监听值变化并执行回调函数，支持单个值、多个值、深度监听等。
        </p>
        <WatchDemo />
      </div>
    </div>
  )
}

// 题目1测试组件
function ToggleDemo() {
  const [value, toggle] = useToggle(false)

  return (
    <div className="space-y-2">
      <p>
        当前值: <strong>{value ? 'true' : 'false'}</strong>
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => toggle()}
          variant="outline">
          切换
        </Button>
        <Button
          onClick={() => toggle(true)}
          variant="outline">
          设置为 true
        </Button>
        <Button
          onClick={() => toggle(false)}
          variant="outline">
          设置为 false
        </Button>
      </div>
    </div>
  )
}

// 题目2测试组件
function DebounceDemo() {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 500)

  return (
    <div className="space-y-2">
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="快速输入，观察防抖效果..."
      />
      <div>
        <p className="text-sm text-gray-600">
          实时值: <strong>{input || '(空)'}</strong>
        </p>
        <p className="text-sm text-gray-600">
          防抖值: <strong>{debouncedValue || '(空)'}</strong>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          防抖值会在停止输入 500ms 后更新
        </p>
      </div>
    </div>
  )
}

// 题目3测试组件
function RequestDemo() {
  const { data, loading, error, run } = useRequest(async () => {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    const random = Math.random()
    if (random > 0.3) {
      return { message: '请求成功！', timestamp: Date.now() }
    } else {
      throw new Error('请求失败，请重试')
    }
  })

  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm">
          状态:{' '}
          <strong>
            {loading ? '加载中...' : error ? '错误' : data ? '成功' : '等待'}
          </strong>
        </p>
        {data && (
          <p className="text-sm text-green-600 mt-1">
            数据: {JSON.stringify(data)}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-1">错误: {error.message}</p>
        )}
      </div>
      <Button
        onClick={run}
        disabled={loading}
        variant="outline">
        {loading ? '请求中...' : '重新请求'}
      </Button>
      <p className="text-xs text-gray-400 mt-1">
        组件挂载时自动请求一次，点击按钮可手动重新请求
      </p>
    </div>
  )
}

// useWatch 演示组件
function WatchDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [user, setUser] = useState({ name: 'John', age: 20 })
  const [watchLog, setWatchLog] = useState<string[]>([])

  // 监听单个值
  useWatch(count, (newVal, oldVal) => {
    setWatchLog(prev => [...prev, `count: ${oldVal} -> ${newVal}`])
  })

  // 监听多个值
  useWatch([count, name], ([newCount, newName], oldVals) => {
    const [oldCount, oldName] = oldVals || [undefined, undefined]
    setWatchLog(prev => [
      ...prev,
      `[count, name]: [${oldCount}, ${oldName}] -> [${newCount}, ${newName}]`
    ])
  })

  // 深度监听对象
  useWatch(
    user,
    (newVal, oldVal) => {
      setWatchLog(prev => [
        ...prev,
        `user: ${JSON.stringify(oldVal)} -> ${JSON.stringify(newVal)}`
      ])
    },
    { deep: true }
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <span className="text-sm w-20">Count:</span>
          <Button
            onClick={() => setCount(c => c + 1)}
            variant="outline"
            size="sm">
            +1
          </Button>
          <span className="text-sm">{count}</span>
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm w-20">Name:</span>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="输入名字..."
            className="w-40"
          />
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm w-20">User:</span>
          <Input
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            placeholder="用户名"
            className="w-32"
          />
          <Input
            type="number"
            value={user.age}
            onChange={e => setUser({ ...user, age: Number(e.target.value) })}
            placeholder="年龄"
            className="w-20"
          />
        </div>
      </div>

      <div className="border rounded p-2 bg-gray-50 max-h-40 overflow-y-auto">
        <p className="text-xs font-semibold mb-1">监听日志:</p>
        {watchLog.length === 0 ? (
          <p className="text-xs text-gray-400">暂无变化</p>
        ) : (
          <div className="space-y-1">
            {watchLog.map((log, index) => (
              <p
                key={index}
                className="text-xs text-gray-700 font-mono">
                {log}
              </p>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => setWatchLog([])}
        variant="outline"
        size="sm">
        清空日志
      </Button>
    </div>
  )
}
