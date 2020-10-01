import json
import os
import boto3


def handler(event, context):
    print('Fetch Dynamo lambda event: ' + json.dumps(event))

    dynamodb = boto3.resource('dynamodb')
    dynamo_table = dynamodb.Table(os.environ['DYNAMO_TABLE_NAME'])

    response = dynamo_table.scan()
    s3_client = boto3.client('s3')

    for item in response['Items']:
        image = item['image']
        bucket_name = image.split('/')[2]
        object_name = image.split('/')[3].replace('+', ' ')
        s3_presigned_url = s3_client.generate_presigned_url('get_object',
                                                            Params={'Bucket': bucket_name,
                                                                    'Key': object_name},
                                                            ExpiresIn=9999
                                                            )
        item['image'] = s3_presigned_url
        print(item['image'])

    return {
        'statusCode': 200,
        'body': json.dumps(response['Items'])
    }
