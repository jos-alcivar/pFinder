// passport-config.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  verifyUser,
  profileGoogleUser,
} from "./controllers/user.controller.js";
import extractGoogleProfile from "./utils/extract.profile.js";

// Local Passport configuration
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        console.log("Attempting to authenticate user:", email);
        const user = await verifyUser(email, password);

        if (!user) {
          console.log("Authentication failed");
          return done(null, false, { message: "Incorrect email or password" });
        }

        console.log("Authentication successful");
        return done(null, user);
      } catch (error) {
        console.error("Error during authentication:", error);
        return done(error);
      }
    }
  )
);

// Google Passport configuration
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.APP_CB_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = extractGoogleProfile(profile);
        const googleUser = await profileGoogleUser(userData);
        //console.log(userData);
        return done(null, googleUser);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
