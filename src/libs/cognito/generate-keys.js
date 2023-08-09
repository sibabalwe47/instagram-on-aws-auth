import axios from "axios";

const url = `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3wO1ZRnnd/.well-known/jwks.json`;
// https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3wO1ZRnnd/.well-known/jwks.json

export const generatePublicKeys = async () => {
  try {
    const { data } = await axios.get(url);

    return {
      alg: data.keys[0].alg,
      e: data.keys[0].e,
      kid: data.keys[0].kid,
      kty: data.keys[0].kty,
      n: data.keys[0].n,
      use: data.keys[0].use,
    };
  } catch (error) {
    throw new Error("Error occurred.", {
      __type: "NotAuthorizedException",
    });
  }
};
