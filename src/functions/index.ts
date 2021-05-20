import { helloWorld } from './hello-world'
import { docs } from './docs'
import authorizer from './auth'

export default {
  authorizer,
  ...helloWorld,
  ...docs,
}
