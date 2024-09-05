import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/auth.controller.js";

const routerAuth = Router();

// Google OAuth routes
routerAuth.get("/google", googleAuth);

routerAuth.get("/google/callback", googleAuthCallback);

routerAuth.get("/logout", logout);

export default routerAuth;
