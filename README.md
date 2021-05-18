# NodeJS Serverless API Template

A simple template for serverless API's using AWS, [Serverless Framework](https://serverless.com/framework/docs/) and Node.js.

## Features

- **TypeScript**
- **ESbuild** with individual packaging (with [`serverless-esbuild`](https://github.com/floydspace/serverless-esbuild))
- **Authorizer** function integration
- **Offline development** with hot-reload (with [`serverless-offline`](https://github.com/dherault/serverless-offline))
- **Automated certificates** (with [`serverless-certificate-creator`](https://github.com/schwamster/serverless-certificate-creator))
- **Automated domains** based on stage (with [`serverless-domain-manager`](https://github.com/amplify-education/serverless-domain-manager))
- **Prettier** for quick and easy formatting

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

## How to run locally

1. `npm install`
2. Rename the project `name` in `package.json` (used by Serverless when deploying)
3. Create a `.env.local` enviromnet file with `.env.example` as template ([details](#environment))
4. `docker-compose up` to run the database (be sure that the `.env` credentials match)
5. `npm run dev` to run the development server (no other configuration needed for local development). All available endpoints should be listed in the terminal.

### Environment

While developing locally, all environment variables are injected _automatically_ by Serverless from `.env` or `.env.{stage}` environment files. By default the `npm run dev` command is an alias to `sls offline start --stage local`.

In order to access environment variables in your lambdas, they need to be defined inside the `serverless.ts` config.

```js
// serverless.ts
const config = {
   ...{} // your config
   provider: {
      ...{} // other provider specific configuration
      environment: {
         YOUR_ENV_VAR: '${env:ENV_VAR, "fallback"}'
         // ENV_VAR is extracted by Serverless form your .env files
         // Access your variable with process.env.YOUR_ENV_VAR
      }
   }
}
```

Now you can safely access environment variables in your code at runtime.

Make sure to add fallback values that point to _real_ variables that your service will use when deployed. Because Serverless extracts variables from `.env.local` during development, every other stage will cause Serverless to resolve to the fallback value (an error will be thrown if no fallback values are added and the variables do not exist).

```js
// serverless.ts     config.provider.environment
YOUR_ENV_VAR: '${env:ENV_VAR, ssm:/path/to/service/myParam}'
```

Above is an example of a fallback that will resolve to a variable defined in SSM Parameter Store ([more details](https://www.serverless.com/framework/docs/providers/aws/guide/variables/#reference-variables-using-the-ssm-parameter-store)).

## Deploying

> **Important** Make sure that each environment variable has a fallback in `config.provider.environment` (read the [environment section](#environment))

1. Provide your AWS credentials either by adding them to `.env` or using `serverless config credetials -p aws -k <access_key> -s <secret_key> [-p <profile>]` if you want to save the credentials globally.
2. Make sure that your domain is managed by AWS and you have your base `DOMAIN` set in `.env`. Lambdas will be deployed to `{stage}.{domain}`.
3. Generate your certificate with `npx sls create-cert`. This will generate a `*.{domain}` wildcard certificate.
4. Generate your dev domain with `npx sls create_domain`. This will generate a `dev.${domain}` domain. For other stages you can use `npx sls create_domain --stage {stage}`
5. Make sure you have all the other services required set up in AWS (e.g. RDS) and that their respective connection options are setup in the enviroment (`config.provider.enviroment`). [More info about setting variables](https://www.serverless.com/framework/docs/providers/aws/guide/variables/).
