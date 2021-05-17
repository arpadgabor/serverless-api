# NodeJS Serverless API Template

## Project structure

```
project/
├─ src/
│  ├─ functions/
│  │  ├─ index.ts               # Exports all functions which are imported in serverless.ts.
│  │  ├─ hello-world/           # A folder for each resource (e.g. users folder).
│  │  │  ├─ index.ts            # Exports all functions for the `users` resource.
│  │  │  ├─ hello/              # Example function using a DB connection and JWT authorizer.
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ handler.ts
│  │  │  ├─ world/              # Example function to generate JWT's for authorizer.
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ handler.ts
│  │  ├─ auth/                  # Example custom authorizer function
│  │  │  ├─ index.ts
│  │  │  ├─ handler.ts
│  │  │  ├─ util.ts
│  ├─ lib/                      # Common logic, services, models, etc. for all functions.
│  │  ├─ db.ts                  # DB connection with Knex (can be easily replaced).
│  │  ├─ apiGateway.ts          # Utility to generate JSON response.
│  │  ├─ handlerResolver.ts     # Utility to add lambda handlers in config relatively.
├─ types/                       # Global type definitions
├─ serverless.ts                # Main configuration file
├─ docker-compose.yml           # Docker compose to spin a postgres database for easy local development
├─ tsconfig.json
├─ package.json
├─ package-lock.json
├─ .env                         # Defined ENV variables for local development
```

## How to run

1. `npm install`
2. Create a `.env` file from the `.env.example` template
3. `docker-compose up` to run the database (be sure that the `.env` credentials match)
4. `npm run dev` to run the development server (no other configuration needed for local development)
   All available endpoints should be listed in the terminal.
