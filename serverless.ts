import type { AWS } from '@serverless/typescript'
import { name } from './package.json'

import functions from './src/functions'

const serverlessConfiguration: AWS = {
  service: name,
  frameworkVersion: '2',
  unresolvedVariablesNotificationMode: 'error',
  configValidationMode: 'error',
  useDotenv: true,
  variablesResolutionMode: '20210326',

  plugins: [
    'serverless-esbuild',
    'serverless-domain-manager',
    'serverless-certificate-creator',
    'serverless-offline'
  ],

  custom: {
    baseDomain: '${env:DOMAIN}',
    domain: '${self:provider.stage}.${self:custom.baseDomain}', // dev.domain.com

    customCertificate: {
      certificateName: '*.${self:custom.baseDomain}', // *.domain.com
      hostedZoneNames: '${self:custom.baseDomain}.', // domain.com.
      region: '${self:provider.region}'
    },

    customDomain: {
      region: '${self:provider.region}',
      domainName: '${self:custom.domain}',
      certificateName: '${self:custom.customCertificate.certificateName}',
      basePath: '',
      endpointType: 'regional',
      stage: '${self:provider.stage}',
      createRoute53Record: true,
    },

    esbuild: {
      bundle: true,
      minify: false,
      packager: 'npm',
      external: ['knex', 'pg'],
      watch: {
        pattern: ['./**/*.ts'],
        ignore: ['.esbuild', 'dist', 'node_modules', '.serverless']
      }
    },
  },

  package: {
    individually: true,
  },

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    endpointType: 'regional',

    // @ts-ignore
    region: '${opt:region, "eu-central-1"}',
    stage: '${opt:stage, "dev"}',

    stackName: '${self:service}--${self:provider.stage}',
    apiName: '${self:service}--${self:provider.stage}',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_NAME: '${env:DB_NAME}',
      DB_USER: '${env:DB_USER}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
    },

    lambdaHashingVersion: '20201221',
  },

  functions
}

module.exports = serverlessConfiguration
