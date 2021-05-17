import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda'

type ParsedHTTPEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: S }
export type HTTPEvent<S = never> = Handler<
  ParsedHTTPEvent<S>,
  APIGatewayProxyResult
>

export const formatJSONResponse = (
  response: Record<string, unknown>,
  status = 200
) => {
  return {
    statusCode: status,
    body: JSON.stringify(response),
  }
}
