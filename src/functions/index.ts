import { helloWorld } from './hello-world';
import authorizer from './auth'

export default {
  authorizer,
  ...helloWorld,
}
