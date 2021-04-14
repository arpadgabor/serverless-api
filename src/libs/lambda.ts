import { Handler } from "aws-lambda"
import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler: Handler<any, any>) => {
  return middy(handler).use(middyJsonBodyParser())
}
