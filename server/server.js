import express from "express";
import cors from "cors";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import router from "./src/routes/task.routes.js";
import routerAuth from "./src/routes/auth.routes.js";

env.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.APP_HOME,
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.APP_CB_URL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.use(router);
app.use("/auth", routerAuth);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
