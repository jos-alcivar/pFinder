// server.js
import express from "express";
import cors from "cors";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import "./src/passport-config.js"; // Import Passport configuration
import router from "./src/routes/task.routes.js";
import routerAuth from "./src/routes/auth.routes.js";
import routerUser from "./src/routes/user.routes.js";

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

// Routes
app.use(router); // Task routes
app.use("/user", routerUser); // User routes
app.use("/auth", routerAuth); // Auth routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
