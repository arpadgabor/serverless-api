import 'source-map-support/register';

import type { HTTPEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const findById: HTTPEvent<undefined> = async (event, context) => {
  return formatJSONResponse({
    event,
    context
  });
}

export const main = middyfy(findById);
