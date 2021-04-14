import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"

type ParsedHTTPEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: S }
export type HTTPEvent<S> = Handler<ParsedHTTPEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
