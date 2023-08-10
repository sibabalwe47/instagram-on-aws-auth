import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const DYNAMO_CLIENT = new DynamoDBClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const putItemHandler = async (item) => {
  try {
    const result = await DYNAMO_CLIENT.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_NAME,
        Item: {
          id: {
            S: item.token,
          },
          userId: {
            S: item.userId,
          },
          email: {
            S: item.email,
          },
          timestamp: {
            S: Date.now().toString(),
          },
        },
      })
    );

    return {
      statusCode: result["$metadata"].httpStatusCode,
      success: true,
    };
  } catch (error) {
    throw {
      statusCode: error["$metadata"].httpStatusCode,
      message: error && error.message ? error.message : "Unknown error.",
      type: error && error.__type,
    };
  }
};
