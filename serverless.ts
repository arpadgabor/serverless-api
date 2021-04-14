import type { AWS } from '@serverless/typescript'

import { cars } from '@functions/cars'

const serverlessConfiguration: AWS = {
  service: 'esbuild-testing-zone',
  frameworkVersion: '2',

  plugins: ['serverless-esbuild'],

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      external: ['knex', 'pg'],
      packager: 'yarn'
    },
  },

  package: {
    individually: true,
  },

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },

    lambdaHashingVersion: '20201221',
  },

  functions: {
    ...cars,
  },
}

module.exports = serverlessConfiguration
