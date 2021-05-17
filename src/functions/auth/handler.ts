import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayTokenAuthorizerEvent, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';

export const func: APIGatewayTokenAuthorizerHandler = async (event) => {
  console.log(event.authorizationToken)
  return {
    policyDocument: {
      Statement: '123',
      Version: '123'
    },
    principalId: '123',
  }
  // return formatJSONResponse({ event });
}
