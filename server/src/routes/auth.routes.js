import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
  localLogin,
  checkAuthStatus,
} from "../controllers/auth.controller.js";

const routerAuth = Router();

// Google OAuth routes
routerAuth.get("/google", googleAuth);
routerAuth.get("/google/callback", googleAuthCallback);

// Local login route
routerAuth.post("/login", localLogin);

routerAuth.get("/logout", logout);
routerAuth.get("/status", checkAuthStatus);

export default routerAuth;
