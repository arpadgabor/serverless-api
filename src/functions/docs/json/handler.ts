import { response } from '@libs/utils'
import { APIGatewayProxyHandler } from 'aws-lambda'
import * as swagger from 'swagger.json'

export const func: APIGatewayProxyHandler = async () => {
  return response(swagger)
}
