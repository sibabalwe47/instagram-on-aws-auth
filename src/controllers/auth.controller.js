//import { signUpHandler } from "../libs/cognito/signup.js";

import * as authProvider from "../libs/cognito/index.js";
import * as sessionProvider from "../libs/dynamodb/index.js";

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authProvider.signUpHandler(email, password);

    res.status(result.statusCode).json({
      message: "You were signed up successfully!",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authProvider.signInHandler(email, password);

    // Generate a session item in dynamo db
    const generateSession = await sessionProvider.putItemHandler(result);

    res.status(result.statusCode).json({
      userId: result.userId,
      email: result.email,
      token: result.token,
      refreshToken: result.refreshToken,
      verified: result.verified,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const verify = async (req, res) => {
  try {
    const { email, confirmationCode } = req.body;

    const result = await authProvider.VerifyHandler(email, confirmationCode);

    res.status(result.statusCode).json({
      message: "Email verified successfully!",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const resendConfirmationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await authProvider.ResendConfirmationCodeHandler(email);

    res.status(result.statusCode).json({
      message: "Confirmation code sent to: " + email,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await authProvider.forgotPasswordHandler(email);

    res.status(result.statusCode).json({
      message:
        "Your verification code has been sent to: " +
        result.codeDeliveryDetails,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, confirmationCode, newPassword } = req.body;

    const result = await authProvider.resetPasswordHandler(
      email,
      confirmationCode,
      newPassword
    );

    res.status(result.statusCode).json({
      message: "Password reset successfully for email: " + email,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { accessToken, previousPassword, newPassword } = req.body;

    const result = await authProvider.changePasswordHandler(
      accessToken,
      previousPassword,
      newPassword
    );

    res.status(result.statusCode).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const validateUserSession = async (req, res) => {
  try {
    const { token } = req.body;

    // Gets session in dynamodb
    const result = await sessionProvider.getItemHandler(token);

    // Check validity
    const sessionStartTime = result.item.timestamp;
    const currentTime = new Date();
    const difference = currentTime - result.item.timestamp;
    const sessionLength = 1000 * 60 * 60;

    if (Math.abs(difference) > sessionLength) {
      return res.status(401).json({
        success: false,
        type: "InvalidTokenException",
        message: "The token has expired, please login again.",
      });
    }

    res.status(200).json({
      userId: result.item.userId,
      email: result.item.email,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const signOut = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const signoutAction = await authProvider.SignOutHandler(accessToken);

    const removeExistingSessions = await sessionProvider.getItemHandler(
      accessToken
    );

    res.status(signoutAction.statusCode).json({
      message: "OK",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

export default {
  signUp,
  signIn,
  verify,
  resendConfirmationCode,
  forgotPassword,
  resetPassword,
  changePassword,
  validateUserSession,
  signOut,
};
