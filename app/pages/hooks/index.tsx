import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BuiltInHooks } from './components/BuiltInHooks'
import { OpensourceHooks } from './components/OpensourceHooks'
import { CustomHooks } from './components/CustomHooks'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Hooks - React Router App' },
    { name: 'description', content: 'Hooks page' }
  ]
}

export default function Hooks() {
  return (
    <div>
      <h1>Hooks</h1>
      <Tabs defaultValue="built-in-hooks">
        <TabsList>
          <TabsTrigger value="built-in-hooks">Built-in Hooks</TabsTrigger>
          <TabsTrigger value="opensource-hooks">Opensource Hooks</TabsTrigger>
          <TabsTrigger value="custom-hooks">Custom Hooks</TabsTrigger>
        </TabsList>
        <TabsContent value="built-in-hooks">
          <BuiltInHooks></BuiltInHooks>
        </TabsContent>
        <TabsContent value="opensource-hooks">
          <OpensourceHooks></OpensourceHooks>
        </TabsContent>
        <TabsContent value="custom-hooks">
          <CustomHooks></CustomHooks>
        </TabsContent>
      </Tabs>
    </div>
  )
}
