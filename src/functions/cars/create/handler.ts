import 'source-map-support/register';

import type { HTTPEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { db } from '@libs/db';

interface Body {
  brand: string
  model: string
  year: number
}

const create: HTTPEvent<Body> = async (event) => {
  const result = db.raw('SELECT 1 + 1 AS RESULT')
  return formatJSONResponse({
    event
  });
}

export const main = middyfy(create);
