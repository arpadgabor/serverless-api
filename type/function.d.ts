import type { AWS, AwsAlbListenerArn, AwsAlexaEventToken, AwsArn, AwsArnString, AwsCfFunction, AwsCfGetAtt, AwsCfImport, AwsCfInstruction, AwsCfJoin, AwsCfRef, AwsKmsArn, AwsLambdaEnvironment, AwsLambdaLayers, AwsLambdaMemorySize, AwsLambdaRole, AwsLambdaRuntime, AwsLambdaTimeout, AwsLambdaTracing, AwsLambdaVersioning, AwsLambdaVpcConfig, AwsLogGroupName, AwsResourceCondition, AwsResourceDependsOn, AwsResourceTags, EcrImageUri, FunctionName,  } from '@serverless/typescript'

export interface FunctionDefinition {
  name?: string;
  events?: (
    | {
        __schemaWorkaround__: {
          [k: string]: unknown;
        };
      }
    | {
        schedule:
          | string
          | {
              rate: string;
              enabled?: boolean;
              name?: string;
              description?: string;
              input?:
                | string
                | (
                    | {
                        body: string;
                      }
                    | {
                        [k: string]: unknown;
                      }
                  );
              inputPath?: string;
              inputTransformer?: {
                inputTemplate: string;
                inputPathsMap?: {
                  [k: string]: unknown;
                };
              };
            };
      }
    | {
        s3:
          | string
          | {
              bucket: string;
              event?: string;
              existing?: boolean;
              rules?: {
                prefix?: string;
                suffix?: string;
              }[];
            };
      }
    | {
        http:
          | string
          | {
              async?: boolean;
              authorizer?:
                | string
                | {
                    arn?: AwsArn;
                    authorizerId?: AwsCfInstruction;
                    claims?: string[];
                    identitySource?: string;
                    identityValidationExpression?: string;
                    managedExternally?: boolean;
                    name?: string;
                    resultTtlInSeconds?: number;
                    scopes?: string[];
                    type?: string | string | string | string;
                  };
              connectionId?: string;
              connectionType?: string | string;
              cors?:
                | boolean
                | (
                    | {
                        [k: string]: unknown;
                      }
                    | {
                        [k: string]: unknown;
                      }
                  );
              integration?: string | string | string | string | string | string | string | string | string | string;
              method: string;
              operationId?: string;
              path: string;
              private?: boolean;
              request?: {
                contentHandling?: "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT";
                method?: string;
                parameters?: {
                  querystrings?: {
                    [k: string]:
                      | boolean
                      | {
                          required?: boolean;
                          mappedValue?: string;
                        };
                  };
                  headers?: {
                    [k: string]:
                      | boolean
                      | {
                          required?: boolean;
                          mappedValue?: string;
                        };
                  };
                  paths?: {
                    [k: string]:
                      | boolean
                      | {
                          required?: boolean;
                          mappedValue?: string;
                        };
                  };
                };
                passThrough?: "NEVER" | "WHEN_NO_MATCH" | "WHEN_NO_TEMPLATES";
                schema?: {
                  [k: string]:
                    | {
                        [k: string]: unknown;
                      }
                    | string;
                };
                schemas?: {
                  [k: string]:
                    | {
                        [k: string]: unknown;
                      }
                    | string;
                };
                template?: {
                  [k: string]: string;
                };
                uri?: string;
              };
              response?: {
                contentHandling?: "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT";
                headers?: {
                  [k: string]: string;
                };
                template?: string;
                statusCodes?: {
                  [k: string]: {
                    headers?: {
                      [k: string]: string;
                    };
                    pattern?: string;
                    template?:
                      | string
                      | {
                          [k: string]: string;
                        };
                  };
                };
              };
            };
      }
    | {
        websocket:
          | string
          | {
              route: string;
              routeResponseSelectionExpression?: "$default";
              authorizer?:
                | AwsArnString
                | FunctionName
                | (
                    | {
                        [k: string]: unknown;
                      }
                    | {
                        [k: string]: unknown;
                      }
                  );
            };
      }
    | {
        sns:
          | string
          | AwsArnString
          | (
              | {
                  [k: string]: unknown;
                }
              | {
                  [k: string]: unknown;
                }
            );
      }
    | {
        stream:
          | AwsArnString
          | (
              | {
                  arn: AwsCfFunction;
                  [k: string]: unknown;
                }
              | {
                  arn: AwsArnString;
                  [k: string]: unknown;
                }
            );
      }
    | {
        kafka: {
          accessConfigurations: {
            vpcSubnet?: string[];
            vpcSecurityGroup?: string[];
            saslScram256Auth?: string[];
            saslScram512Auth?: string[];
          };
          batchSize?: number;
          enabled?: boolean;
          bootstrapServers: string[];
          startingPosition?: "LATEST" | "TRIM_HORIZON";
          topic: string;
        };
      }
    | {
        msk: {
          arn: AwsArnString | AwsCfImport | AwsCfRef;
          batchSize?: number;
          enabled?: boolean;
          startingPosition?: "LATEST" | "TRIM_HORIZON";
          topic: string;
        };
      }
    | {
        alb: {
          authorizer?: string[];
          conditions: {
            header?: {
              name: string;
              values: string[];
            };
            host?: string[];
            ip?: (string | string)[];
            method?: string[];
            path?: string[];
            query?: {
              [k: string]: string;
            };
          };
          healthCheck?:
            | boolean
            | {
                healthyThresholdCount?: number;
                intervalSeconds?: number;
                matcher?: {
                  httpCode?: string;
                };
                path?: string;
                timeoutSeconds?: number;
                unhealthyThresholdCount?: number;
              };
          listenerArn: AwsAlbListenerArn | AwsCfRef;
          multiValueHeaders?: boolean;
          priority: number;
          targetGroupName?: string;
        };
      }
    | {
        alexaSkill:
          | AwsAlexaEventToken
          | {
              appId: AwsAlexaEventToken;
              enabled?: boolean;
            };
      }
    | {
        alexaSmartHome:
          | AwsAlexaEventToken
          | {
              appId: AwsAlexaEventToken;
              enabled?: boolean;
            };
      }
    | {
        iot: {
          sql: string;
          sqlVersion?: "2015-10-08" | "2016-03-23" | "beta";
          name?: string;
          enabled?: boolean;
          description?: string;
        };
      }
    | {
        iotFleetProvisioning: {
          enabled?: boolean;
          provisioningRoleArn: AwsArn;
          templateBody: {
            [k: string]: unknown;
          };
          templateName?: string;
        };
      }
    | {
        cloudwatchEvent: {
          event?: {
            [k: string]: unknown;
          };
          input?:
            | string
            | {
                [k: string]: unknown;
              };
          inputPath?: string;
          inputTransformer?: {
            inputPathsMap?: {
              [k: string]: string;
            };
            inputTemplate: string;
          };
          description?: string;
          name?: string;
          enabled?: boolean;
        };
      }
    | {
        cloudwatchLog:
          | AwsLogGroupName
          | {
              logGroup: AwsLogGroupName;
              filter?: string;
            };
      }
    | {
        cognitoUserPool: {
          pool: string;
          trigger:
            | "PreSignUp"
            | "PostConfirmation"
            | "PreAuthentication"
            | "PostAuthentication"
            | "PreTokenGeneration"
            | "CustomMessage"
            | "DefineAuthChallenge"
            | "CreateAuthChallenge"
            | "VerifyAuthChallengeResponse"
            | "UserMigration";
          existing?: boolean;
        };
      }
    | {
        eventBridge:
          | {
              [k: string]: unknown;
            }
          | {
              [k: string]: unknown;
            };
      }
    | {
        sqs:
          | AwsArn
          | {
              arn: AwsArn;
              batchSize?: number;
              enabled?: boolean;
              maximumBatchingWindow?: number;
            };
      }
    | {
        cloudFront: {
          behavior?: {
            AllowedMethods?:
              | ("GET" | "HEAD")[]
              | ("GET" | "HEAD" | "OPTIONS")[]
              | ("GET" | "HEAD" | "OPTIONS" | "PUT" | "PATCH" | "POST" | "DELETE")[];
            CachedMethods?: ("GET" | "HEAD")[] | ("GET" | "HEAD" | "OPTIONS")[];
            ForwardedValues?: {
              Cookies?:
                | {
                    Forward: "all" | "none";
                  }
                | {
                    Forward: "whitelist";
                    WhitelistedNames: string[];
                  };
              Headers?: string[];
              QueryString: boolean;
              QueryStringCacheKeys?: string[];
            };
            CachePolicyId?: string;
            Compress?: boolean;
            FieldLevelEncryptionId?: string;
            OriginRequestPolicyId?: string;
            SmoothStreaming?: boolean;
            TrustedSigners?: string[];
            ViewerProtocolPolicy?: "allow-all" | "redirect-to-https" | "https-only";
          };
          cachePolicy?:
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              };
          eventType?: "viewer-request" | "origin-request" | "origin-response" | "viewer-response";
          isDefaultOrigin?: boolean;
          includeBody?: boolean;
          origin?:
            | string
            | (
                | {
                    [k: string]: unknown;
                  }
                | {
                    [k: string]: unknown;
                  }
              );
          pathPattern?: string;
        };
      }
    | {
        httpApi:
          | string
          | {
              authorizer?:
                | string
                | (
                    | {
                        [k: string]: unknown;
                      }
                    | {
                        [k: string]: unknown;
                      }
                    | {
                        [k: string]: unknown;
                      }
                  );
              method?: string;
              path: string;
            };
      }
  )[];
  awsKmsKeyArn?: AwsKmsArn;
  condition?: AwsResourceCondition;
  dependsOn?: AwsResourceDependsOn;
  description?: string;
  destinations?: {
    onSuccess?: string;
    onFailure?: string;
  };
  disableLogs?: boolean;
  environment?: AwsLambdaEnvironment;
  fileSystemConfig?: {
    arn: string | AwsCfGetAtt | AwsCfJoin | AwsCfImport;
    localMountPath: string;
  };
  handler?: string;
  image?:
    | EcrImageUri
    | {
        name?: string;
        uri?: EcrImageUri;
        workingDirectory?: string;
        command?: string[];
        entryPoint?: string[];
      };
  kmsKeyArn?: AwsKmsArn;
  layers?: AwsLambdaLayers;
  maximumEventAge?: number;
  maximumRetryAttempts?: number;
  memorySize?: AwsLambdaMemorySize;
  onError?: string | AwsCfFunction;
  package?: {
    artifact?: string;
    exclude?: string[];
    include?: string[];
    individually?: boolean;
    patterns?: string[];
  };
  provisionedConcurrency?: number;
  reservedConcurrency?: number;
  role?: AwsLambdaRole;
  runtime?: AwsLambdaRuntime;
  tags?: AwsResourceTags;
  timeout?: AwsLambdaTimeout;
  tracing?: AwsLambdaTracing;
  versionFunction?: AwsLambdaVersioning;
  vpc?: AwsLambdaVpcConfig;
}