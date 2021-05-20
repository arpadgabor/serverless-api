import { APIGatewayProxyHandler } from 'aws-lambda'
import { redoc } from './redoc'

export const func: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: redoc,
    headers: {
      'content-type': 'text/html',
    },
  }
}
