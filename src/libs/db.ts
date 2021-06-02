import 'pg'
import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  log: {
    enableColors: true,
  },
})

export { db }
