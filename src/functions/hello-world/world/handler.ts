import type { HTTPEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const find: HTTPEvent = async (event, context) => {
  return formatJSONResponse({ event, context });
}

export const main = middyfy(find);
