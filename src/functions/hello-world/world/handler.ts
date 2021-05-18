import { APIGatewayProxyEvent } from 'aws-lambda'
import { response } from '@libs/utils'
import { sign } from 'jsonwebtoken'

export const func = async (event: APIGatewayProxyEvent) => {
  const user: string = event.queryStringParameters?.['user']

  if (!user)
    return response({ message: 'No user provided!', env: process.env }, 400)

  const token = sign({ scopes: ['*:*'] }, process.env.JWT_SECRET, {
    subject: user,
    expiresIn: '1d',
  })

  return response({ token })
}
