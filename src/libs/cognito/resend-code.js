import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const COGNITO_CLIENT = new CognitoIdentityProviderClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const ResendConfirmationCodeHandler = async (email) => {
  try {
    const result = await COGNITO_CLIENT.send(
      new ResendConfirmationCodeCommand({
        ClientId: process.env.USERPOOL_CLIENT_ID,
        Username: email,
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
