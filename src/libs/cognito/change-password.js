import {
  CognitoIdentityProviderClient,
  ChangePasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export const COGNITO_CLIENT = new CognitoIdentityProviderClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const changePasswordHandler = async (
  accessToken,
  previousPassword,
  newPassword
) => {
  console.log("previousPassword:", previousPassword);
  console.log("accessToken:", accessToken);
  console.log("newPassword:", newPassword);
  try {
    const result = await COGNITO_CLIENT.send(
      new ChangePasswordCommand({
        ClientId: process.env.USERPOOL_CLIENT_ID,
        PreviousPassword: previousPassword,
        ProposedPassword: newPassword,
        AccessToken: accessToken,
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
