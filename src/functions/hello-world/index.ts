import { FunctionDefinition } from '~types'
import hello from './hello'
import world from './world'

export const helloWorld: Record<string, FunctionDefinition> = {
  hello,
  world
}