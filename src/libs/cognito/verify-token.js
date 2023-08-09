import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { generatePublicKeys } from "./generate-keys.js";

export const verifyIdToken = async (idToken) => {
  const publickKeys = await generatePublicKeys();
  const pem = jwkToPem(publickKeys);
  const verified = jwt.verify(idToken, pem, { algorithms: ["RS256"] });
  return verified;
};
