import { AuthResponse, PolicyDocument, Statement } from 'aws-lambda';

export enum Permission {
  Allow = 'Allow',
  Deny = 'Deny',
}

export function generatePolicy(principalId: string, effect: Permission, resource: string, context?: any): AuthResponse {
  const statement: Statement = {
    Action: 'execute-api:Invoke',
    Effect: effect,
    Resource: resource,
  }

  const policyDocument: PolicyDocument = {
    Version: '2012-10-17',
    Statement: [statement],
  }

  const authResponse: AuthResponse = {
    principalId,
    policyDocument,
    context,
  }

  return authResponse
}

export const allow = (arn: string,  principalId = 'user', ctx?: any) => generatePolicy(principalId, Permission.Allow, arn, ctx)
export const deny = (arn: string, principalId = 'user',  ctx?: any) => generatePolicy(principalId, Permission.Deny, arn, ctx)