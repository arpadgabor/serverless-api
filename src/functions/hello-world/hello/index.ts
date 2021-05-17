import { FunctionDefinition } from '~types';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.func`,
  events: [
    {
      http: {
        method: 'get',
        path: '/hello',
        authorizer: 'authorizer'
      }
    }
  ]
} as FunctionDefinition