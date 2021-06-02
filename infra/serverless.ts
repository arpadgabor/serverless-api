import type { AWS } from '@serverless/typescript'
import { GetAtt, Sub } from '../utils/cloudformation-helpers'
import { name } from '../package.json'

const config: AWS = {
  service: name + 'infra',
  frameworkVersion: '2',
  unresolvedVariablesNotificationMode: 'error',
  configValidationMode: 'error',
  useDotenv: true,
  variablesResolutionMode: '20210326',

  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    endpointType: 'regional',

    // @ts-ignore
    region: '${opt:region, "eu-central-1"}',
    stage: '${opt:stage, "dev"}',

    stackName: '${self:service}--${self:provider.stage}',
  },

  resources: {
    Resources: {
      rdsConfig: {
        Type: 'AWS::SecretsManager::Secret',
        Properties: {
          Name: 'rds-config-${self:service}-${self:provider.stage}',
          Description: 'RDS Config for <${self:service}> service.',
          GenerateSecretString: {
            SecretStringTemplate: JSON.stringify({
              DATABASE_NAME: '${self:service}',
              DATABASE_USER: '${self:service}',
            }),
            GenerateStringKey: 'DATABASE_PASS',
            PasswordLength: 16,
            ExcludeCharacters: '"@/\\',
          },
        },
      },

      rdsPostgres: {
        Type: 'AWS::RDS::DBInstance',
        Properties: {
          Engine: 'postgres',
          AllocatedStorage: '20',
          DBInstanceClass: 'db.t2.micro',
          DBInstanceIdentifier:
            'rds-instance-${self:service}-${self:provider.stage}',
          DBName: Sub('{{resolve:secretsmanager:${rdsConfig}::DATABASE_NAME}}'),
          MasterUsername: Sub(
            '{{resolve:secretsmanager:${rdsConfig}::DATABASE_USER}}'
          ),
          MasterUserPassword: Sub(
            '{{resolve:secretsmanager:${rdsConfig}::DATABASE_PASS}}'
          ),
          BackupRetentionPeriod: 0,
          PubliclyAccessible: true,
        },
      },

      rdsPostgresUrl: {
        Type: 'AWS::SSM::Parameter',
        Properties: {
          Name: 'rds-url-${self:service}-${self:provider.stage}',
          Value: GetAtt('rdsPostgres', 'Endpoint.Address'),
          Type: 'String',
        },
      },
    },
  },
}

module.exports = config
