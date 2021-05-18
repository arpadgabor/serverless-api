import type { AWS } from '@serverless/typescript'
import { name } from './package.json'

import functions from './src/functions'

const config: AWS = {
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
    'serverless-offline',
  ],

  custom: {
    baseDomain: '${env:DOMAIN, "domain.local"}',
    domain: '${self:provider.stage}.${self:custom.baseDomain}', // dev.domain.com

    customCertificate: {
      certificateName: '*.${self:custom.baseDomain}', // *.domain.com
      hostedZoneNames: '${self:custom.baseDomain}.', // domain.com.
      region: '${self:provider.region}',
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
      DB_NAME: '${env:DB_NAME, null}',
      DB_USER: '${env:DB_USER, null}',
      DB_PASSWORD: '${env:DB_PASSWORD, null}',
      DB_HOST: '${env:DB_HOST, null}',
      DB_PORT: '${env:DB_PORT, null}',
      JWT_SECRET: '${env:JWT_SECRET, null}',
    },

    lambdaHashingVersion: '20201221',
  },

  functions,
}

module.exports = config
