import { FunctionDefinition } from '@type'
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/cars',
      }
    }
  ]
} as FunctionDefinition
