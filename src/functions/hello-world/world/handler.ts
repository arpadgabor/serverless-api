import { APIGatewayProxyEvent } from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway'
import { sign } from 'jsonwebtoken'

export const func = async (event: APIGatewayProxyEvent) => {
  const user: string = event.queryStringParameters?.['user']

  console.log(process.env)

  const token = sign({ scopes: ['*:*'] }, process.env.JWT_SECRET, {
    subject: user,
    expiresIn: '1d',
  })

  return formatJSONResponse({ token })
}
