import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSessionStorage } from 'react-use'
import { useSessionStorageState as useAhooksSessionStorage } from 'ahooks'

/**
 * react-use 和 ahooks 的 storage 对比
 * react-use 没有做storagechange事件绑定 官方仓库提了一些相关Issues 但目前看是不维护了
 * ahooks默认不开启storagechange事件绑定 可设置listenStorageChange: true开启
 */
export function OpensourceHooks() {
  return (
    <div>
      <h2>Opensource Hooks</h2>
      <div className="w-[50%]">
        <ClientA></ClientA>
        <ClientB></ClientB>
      </div>
    </div>
  )
}

function ClientA() {
  const [value, setValue] = useSessionStorage('react-use-storage', 0)

  const [value2, setValue2] = useAhooksSessionStorage('ahooks-storage', {
    defaultValue: 0,
    listenStorageChange: true
  })
  return (
    <div className="flex align-center gap-2 mb-2">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="react-use"></Input>
      <Input
        value={value2}
        onChange={e => setValue2(e.target.value)}
        placeholder="ahooks"></Input>
    </div>
  )
}

function ClientB() {
  const [value, setValue] = useSessionStorage('react-use-storage', 0)

  const [value2, setValue2] = useAhooksSessionStorage('ahooks-storage', {
    defaultValue: 0,
    listenStorageChange: true
  })

  const handleIncrement = () => {
    setValue(value + 1)
    setValue2(value2 + 1)
  }
  const handleReset = () => {
    setValue(0)
    setValue2(0)
  }
  return (
    <>
      <div className="flex align-center gap-2 mb-2">
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="react-use"></Input>
        <Input
          value={value2}
          onChange={e => setValue2(e.target.value)}
          placeholder="ahooks"></Input>
      </div>
      <div className="flex align-center gap-2">
        <Button onClick={handleIncrement}>Increment</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </>
  )
}
