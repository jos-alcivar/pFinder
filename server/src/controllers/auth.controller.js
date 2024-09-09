import passport from "passport";
import env from "dotenv";

env.config();

// Handles local login
export const localLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/auth/failure");
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect(process.env.APP_ACCOUNT || "/");
    });
  })(req, res, next);
};

// Initiates Google OAuth process
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Handles Google OAuth callback
export const googleAuthCallback = (req, res, next) => {
  console.log("Entering googleAuthCallback");
  passport.authenticate("google", async (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err); // Pass error to the next middleware
    }
    if (!user) {
      console.error("No user found, authentication failed:", info);
      if (!res.headersSent) {
        console.log("Redirecting to /auth/failure");
        return res.redirect("/auth/failure"); // Handle failed authentication
      } else {
        console.error("Headers already sent, cannot redirect");
      }
    }

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        return next(loginErr); // Pass login error to the next middleware
      }

      console.log("Authentication successful, user:", user.user_email);
      if (!res.headersSent) {
        console.log("Redirecting to success page");
        return res.redirect(process.env.APP_ACCOUNT || "/"); // Redirect after successful login
      } else {
        console.error("Headers already sent, cannot redirect");
      }
    });
  })(req, res, next); // Pass req, res, and next to passport
};

// Check authentication status
export const checkAuthStatus = (req, res) => {
  console.log("Status route accessed");
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user }); // Check whether the user is authenticated
  } else {
    res.json({ authenticated: false });
  }
  console.log("isAuthenticated? ", req.isAuthenticated());
};

// Handle logout
export const logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.APP_HOME || "/");
  });
};
