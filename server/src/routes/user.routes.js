import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

router.post("/register", registerUser);

export default router;
