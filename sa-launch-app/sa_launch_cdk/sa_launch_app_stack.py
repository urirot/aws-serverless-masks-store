from aws_cdk import (
    core,
    aws_lambda as _lambda,
    aws_s3,
    aws_s3_notifications,
    aws_iam,
    aws_apigateway,
    aws_s3_deployment,
    aws_cloudfront,
    aws_dynamodb
)


class SaLaunchAppStack(core.Stack):
    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # region IAM
        sa_role = aws_iam.Role(
            self, "Role",
            role_name="SaRole",
            assumed_by=aws_iam.ServicePrincipal("lambda.amazonaws.com"))

        sa_role.add_to_policy(aws_iam.PolicyStatement(
            effect=aws_iam.Effect.ALLOW,
            resources=["*"],
            actions=["cloudwatch:*", "s3:*", "logs:*", "dynamodb:*", "iam:*"]
        ))
        # endregion IAM

        # region S3
        mask_images_bucket = aws_s3.Bucket(self, 'MaskImagesBucket')
        # endregion S3

        # region DB
        masks_db = aws_dynamodb.Table(
            self, 'MasksTable',
            table_name='Masks',
            partition_key=aws_dynamodb.Attribute(
                name='id',
                type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name='mask_name',
                type=aws_dynamodb.AttributeType.STRING
            ),
            removal_policy=core.RemovalPolicy.DESTROY
        )
        # endregion DB

        # region Lambda
        fetch_lambda = _lambda.Function(
            self, 'DynamoFetch',
            runtime=_lambda.Runtime.PYTHON_3_8,
            code=_lambda.Code.asset('lambda'),
            handler='dynamo_fetch.handler',
            environment=dict(DYNAMO_TABLE_NAME=masks_db.table_name),
            role=sa_role
        )

        insert_lambda = _lambda.Function(
            self, 'DynamoInsert',
            runtime=_lambda.Runtime.PYTHON_3_8,
            code=_lambda.Code.asset('lambda'),
            handler='dynamo_insert.handler',
            environment=dict(DYNAMO_TABLE_NAME=masks_db.table_name),
            role=sa_role
        )
        # endregion

        # region API
        base_api = aws_apigateway.LambdaRestApi(
            self, 'SaApi',
            rest_api_name='SaApi',
            handler=fetch_lambda,
            default_cors_preflight_options=aws_apigateway.CorsOptions(
                allow_origins=aws_apigateway.Cors.ALL_ORIGINS
            )
        )

        # endregion API

        # region Frontend
        frontend_bucket = aws_s3.Bucket(
            self, "CreateReactAppBucket",
            website_index_document="index.html"
        )

        frontend_src = aws_s3_deployment.BucketDeployment(
            self, "DeployCRA",
            sources=[aws_s3_deployment.Source.asset("../frontend/sa-app/build")],
            destination_bucket=frontend_bucket
        )

        oia = aws_cloudfront.OriginAccessIdentity(
            self, 'OIA'
        )

        frontend_bucket.grant_read(oia)

        cloudFront = aws_cloudfront.CloudFrontWebDistribution(
            self, "CDKCRAStaticDistribution",
            origin_configs=[
                aws_cloudfront.SourceConfiguration(
                    s3_origin_source=aws_cloudfront.S3OriginConfig(
                        s3_bucket_source=frontend_bucket,
                        origin_access_identity=oia
                    ),
                    behaviors=[aws_cloudfront.Behavior(is_default_behavior=True,
                                                       default_ttl=core.Duration.seconds(0),
                                                       max_ttl=core.Duration.seconds(0),
                                                       min_ttl=core.Duration.seconds(0)
                                                       )
                               ]
                )
            ]
        )
        # endregion

        # region S3 triggers
        new_mask_image_notification = aws_s3_notifications.LambdaDestination(insert_lambda)
        mask_images_bucket.add_event_notification(aws_s3.EventType.OBJECT_CREATED, new_mask_image_notification)
        # endregion
