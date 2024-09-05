import passport from "passport";
import env from "dotenv";

env.config();

// Google OAuth routes
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res) => {
  // Successful authentication
  res.redirect(process.env.APP_HOME); // Redirect to frontend
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(process.env.APP_HOME);
};
