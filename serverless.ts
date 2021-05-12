import type { AWS } from '@serverless/typescript'
import { name } from './package.json'

import functions from './src/functions'

const serverlessConfiguration: AWS = {
  service: name,
  frameworkVersion: '2',
  unresolvedVariablesNotificationMode: 'error',

  plugins: [
    'serverless-esbuild',
    'serverless-domain-manager',
    'serverless-certificate-creator'
  ],

  custom: {
    certName: 'cloud.arpadgabor.com',
    customCertificate: {
      certificateName: '${self:custom.certName}',
      idempotencyToken: '${self:provider.stage}__cloud_arpad_gabor',
      hostedZoneNames: 'cloud.arpadgabor.com.',
      region: '${self:provider.region}'
    },
    
    customDomain: {
      region: '${self:provider.region}',
      domainName: '${self:custom.certName}',
      certificateName: '${self:custom.certName}',
      basePath: '',
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

    // @ts-ignore
    region: '${opt:region, "eu-central-1"}',
    stage: '${opt:stage, "dev"}',

    stackName: '${self:service}--${self:provider.stage}',
    deploymentBucket: '${self:service}--${self:provider.stage}',
    apiName: '${self:service}--${self:provider.stage}',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },

    lambdaHashingVersion: '20201221',
  },

  functions
}

module.exports = serverlessConfiguration
