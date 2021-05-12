import Knex from 'knex'
import 'pg'

const db = Knex({
  client: 'pg',
  connection: process.env.DB_CONNECTION,
  pool: {
    min: 2,
    max: 10,
  },
})

export { db }
