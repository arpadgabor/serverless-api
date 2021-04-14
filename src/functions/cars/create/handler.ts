import 'source-map-support/register';

import type { HTTPEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

interface Body {
  brand: string
  model: string
  year: number
}

const create: HTTPEvent<Body> = async (event) => {
  return formatJSONResponse({
    event
  });
}

export const main = middyfy(create);
