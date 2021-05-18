import { FunctionDefinition } from '~types'
import { handlerPath } from '@libs/utils'

const handler: FunctionDefinition = {
  handler: `${handlerPath(__dirname)}/handler.func`,
}

export default handler
