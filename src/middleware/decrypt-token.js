import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.USERPOOL_ID,
  tokenUse: "access",
  clientId: process.env.USERPOOL_CLIENT_ID,
});

const decryptAuthToken = async (token) => {
  try {
    const extractedToken = token && token.replace("Bearer ", "");
    const payload = await verifier.verify(extractedToken);

    return {
      userId: payload && payload.username,
    };
  } catch (error) {
    throw {
      message: "Invalid Token",
      type: "NotAuthorizedException",
    };
  }
};

export default { decryptAuthToken };
