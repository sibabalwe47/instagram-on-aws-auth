import express from "express";
import AuthController from "../../controllers/auth.controller.js";
const route = express.Router();

route.post("/sign-up", AuthController.signUp);

route.post("/sign-in", AuthController.signIn);

route.post("/verify", AuthController.verify);

route.post("/resend-code", AuthController.resendConfirmationCode);

route.post("/forgot-password", AuthController.forgotPassword);

route.post("/reset-password", AuthController.resetPassword);

route.post("/change-password", AuthController.changePassword);

route.post("/validate-session", AuthController.validateUserSession);

route.post("/sign-out", AuthController.signOut);

export default route;
