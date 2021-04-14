import 'source-map-support/register';

import type { HTTPEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { db } from '@libs/db';

const find: HTTPEvent<undefined> = async (event) => {
  const result = db.raw('SELECT 1 + 1 AS RESULT')

  return formatJSONResponse({
    result
  });
}

export const main = middyfy(find);
