import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { verifyIdToken } from "./verify-token.js";

export const COGNITO_CLIENT = new CognitoIdentityProviderClient({
  region: process.env.ENVIRONMENT_REGION,
});

export const signInHandler = async (email, password) => {
  try {
    const result = await COGNITO_CLIENT.send(
      new InitiateAuthCommand({
        ClientId: process.env.USERPOOL_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: { USERNAME: email, PASSWORD: password },
      })
    );

    const user = await verifyIdToken(result.AuthenticationResult.IdToken);

    return {
      statusCode: result["$metadata"].httpStatusCode,
      verified: user.email_verified,
      userId: user.sub,
      email: user.email,
      token: result.AuthenticationResult.AccessToken,
      refreshToken: result.AuthenticationResult.RefreshToken,
    };
  } catch (error) {
    throw {
      statusCode: error["$metadata"].httpStatusCode,
      message: error && error.message ? error.message : "Unknown error.",
      type: error && error.__type,
    };
  }
};
