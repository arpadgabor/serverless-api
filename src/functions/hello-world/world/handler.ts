import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export const find = async (event: APIGatewayProxyEvent, context: Context) => {
  return formatJSONResponse({ event, context });
}
