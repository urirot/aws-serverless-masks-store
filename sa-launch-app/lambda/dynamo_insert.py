import json
import os
import boto3
import uuid


def create_url(bucket_name, file_name):
    return "s3://{}/{}".format(bucket_name, file_name)


def put_mask(table, s3_url, file_name):
    id = str(uuid.uuid4())[0:10]

    properties = file_name.split('-')
    price = properties[2].split('.')[0] + '.' + properties[2].split('.')[1]

    table.put_item(
        Item={
            'id': id,
            'mask_name': properties[0],
            'description': properties[1].replace('+', ' '),
            'price': price,
            'image': s3_url
        }
    )


def handler(event, context):
    print('Dynamo insert lambda event: ' + json.dumps(event))

    file_obj = event["Records"][0]
    bucket_name = file_obj["s3"]["bucket"]["name"]
    file_name = file_obj["s3"]["object"]["key"]
    s3_url = create_url(bucket_name, file_name)

    dynamodb = boto3.resource('dynamodb')
    dynamo_table = dynamodb.Table(os.environ['DYNAMO_TABLE_NAME'])

    put_mask(dynamo_table, s3_url, file_name)

    return {
        'statusCode': 200,
        'body': event
    }
