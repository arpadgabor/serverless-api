import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import { verify } from 'jsonwebtoken'
import { allow, deny } from './util';

interface JWTPayload {
  iat: number
  exp: number
  sub: string
  scopes: string[]
}

export const func: APIGatewayTokenAuthorizerHandler = async (event) => {
  const method = event.methodArn
  const bearer = event.authorizationToken

  if(!bearer) return deny(method)
  if(!bearer.startsWith('Bearer ')) return deny(method)

  const [, token] = event.authorizationToken.split(' ')

  try {
    const payload: JWTPayload = verify(token, process.env.JWT_SECRET) as JWTPayload

    return allow(method, payload.sub)
  } catch (err) {
    return deny(method)
  }
}
