import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const COGNITO_CLIENT = new CognitoIdentityProviderClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const VerifyHandler = async (email, confirmationCode) => {
  try {
    const result = await COGNITO_CLIENT.send(
      new ConfirmSignUpCommand({
        ClientId: process.env.USERPOOL_CLIENT_ID,
        Username: email,
        ConfirmationCode: confirmationCode,
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
