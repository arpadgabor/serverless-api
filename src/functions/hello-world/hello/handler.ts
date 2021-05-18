import { response } from '@libs/utils'
import { db } from '@libs/db'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

export const func = async (event: APIGatewayProxyEvent, context: Context) => {
  const result = await db.raw(
    'select * from information_schema.key_column_usage'
  )

  return response({ result, event, context })
}
