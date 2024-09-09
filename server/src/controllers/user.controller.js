import bcrypt, { hash } from "bcrypt";
import db from "../../db.js";
import env from "dotenv";

env.config();

// --- Check if user exists, add new user if not ---
export async function profileGoogleUser(user) {
  const { email, displayName, oauth_provider, oauth_id } = user;
  try {
    const result = await db.query("SELECT * from users WHERE user_email =$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      const newUser = await db.query(
        "INSERT INTO users(user_email, user_name, oauth_provider, oauth_id) VALUES ($1, $2, $3, $4)",
        [email, displayName, oauth_provider, oauth_id]
      );
      return newUser.rows[0];
    } else {
      return result.rows[0];
    }
  } catch (err) {
    console.error("Error executing query", err);
  }
}

export async function verifyUser(email, password) {
  try {
    const result = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return false; // User not found
    }

    const user = result.rows[0];

    if (password) {
      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.user_password);
      if (!isMatch) {
        return false; // Password mismatch
      }
    }

    return user;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}

// Create new user with hashed password
export async function createNewUser(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const username = email ? email.split("@")[0] : "";
  try {
    const result = await db.query("SELECT * FROM users WHERE user_email =$1", [
      email,
    ]);

    if (result.rows.length > 0) {
      return res.redirect(process.env.APP_LOGIN || "/");
    } else {
      bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS),
        async (err, hash) => {
          if (err) {
            console.log("Error hashing password:", err);
          } else {
            const newUser = await db.query(
              "INSERT INTO users (user_email, user_password, user_name) VALUES ($1, $2, $3) RETURNING *",
              [email, hash, username]
            );
            req.login(newUser.rows[0], (err) => {
              console.log("New user logged");
              return res.redirect(process.env.APP_ACCOUNT || "/");
            });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getProfilePhoto(req, res) {
  try {
    const input = req.body["user_id"];
    const data = await db.query(
      "SELECT photo FROM users_profile WHERE user_id = $1",
      [input]
    );
    if (data.rows.length !== 0) {
      res.send(data.rows[0]);
    } else {
      res.status(404).send({ error: "No photo found in the database." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the photo." });
  }
}

export async function checkUserExists(req, res) {
  try {
    const input = req.body["user_email"];
    const data = await db.query("SELECT * FROM users WHERE user_email = $1", [
      input,
    ]);

    if (data.rows.length !== 0) {
      const user = data.rows[0];
      res.send(true);
    } else {
      res.send(false); // User not found
    }
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }
}
