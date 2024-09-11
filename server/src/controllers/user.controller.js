import bcrypt, { hash } from "bcrypt";
import db from "../../db.js";
import env from "dotenv";

env.config();

// --- Check if user exists, add new user if not ---
export async function profileGoogleUser(user) {
  const { email, displayName, oauth_provider, oauth_id, profile_photo } = user;
  try {
    const result = await db.query(
      "SELECT *, users_profile.is_admin from users JOIN users_profile ON users.user_id = users_profile.user_id WHERE user_email =$1",
      [email]
    );

    if (result.rows.length === 0) {
      const newUser = await db.query(
        "INSERT INTO users(user_email, user_name, oauth_provider, oauth_id) VALUES ($1, $2, $3, $4) RETURNING user_id",
        [email, displayName, oauth_provider, oauth_id]
      );
      const newUser_id = newUser.rows[0].user_id;

      // --- INSERT INTO USERS PROFILE TABLE ---
      await db.query(
        "INSERT INTO users_profile(user_id, photo_url) VALUES ($1, $2)",
        [newUser_id, profile_photo]
      );

      return newUser.rows[0];
    } else {
      return result.rows[0];
    }
  } catch (err) {
    console.error("Error executing query", err);
  }
}

// Verify email and password for local passport strategy
export async function verifyUser(email, password) {
  try {
    const result = await db.query(
      "SELECT *, users_profile.is_admin from users JOIN users_profile ON users.user_id = users_profile.user_id WHERE user_email =$1",
      [email]
    );

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

// Check if client input user already exists
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

// Get profile photo of user
export async function getProfilePhoto(req, res) {
  const { user_uuid } = req.params;
  let photoBuffer;

  try {
    // Query to fetch the photo binary from the database
    const data = await db.query(
      "SELECT users_profile.photo, users_profile.photo_url, users.user_uuid FROM users_profile JOIN users ON users_profile.user_id = users.user_id WHERE users.user_uuid = $1",
      [user_uuid]
    );

    if (data.rows.length !== 0) {
      const result = data.rows[0];
      if (result["photo"]) {
        photoBuffer = result.photo;
      } else {
        photoBuffer = result.photo_url;
      }

      res.setHeader("Content-Type", "image/png");
      res.send(photoBuffer); // Send the binary image data
    } else {
      // If no photo found, return a 404
      res.status(404).send({ error: "No photo found in the database." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the photo." });
  }
}

// Upload/Update Profile Photo
export async function updateProfilePhoto(req, res) {
  let photoQuery;
  const photoBuffer = req.file.buffer;
  const { user_id } = req.body; // Retrieve user ID from form data

  try {
    // Check if an entry already exists for the user_id
    const checkUserQuery =
      "SELECT user_id FROM users_profile WHERE user_id = $1";
    const userCheckResult = await db.query(checkUserQuery, [user_id]);

    if (userCheckResult.rows.length > 0) {
      // If an entry exists, update the photo for the user
      const updatePhotoQuery =
        "UPDATE users_profile SET photo = $1 WHERE user_id = $2 RETURNING photo";
      photoQuery = await db.query(updatePhotoQuery, [photoBuffer, user_id]);
      console.log("Photo updated successfully");
    } else {
      // If no entry exists, insert a new entry
      const insertPhotoQuery =
        "INSERT INTO users_profile (user_id, photo) VALUES ($1, $2) RETURNING photo";
      photoQuery = await db.query(insertPhotoQuery, [user_id, photoBuffer]);
      console.log("Photo created successfully");
    }
    // GET photo value from database
    const photoResult = photoQuery.rows[0];

    res.setHeader("Content-Type", "image/png");
    res.send(photoResult.photo); // Send the binary image data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload or update photo" });
  }
}

// Get Profile Info
export async function getProfileInfo(req, res) {
  const { user_uuid } = req.params;
  let profileInfo;

  try {
    // Check if an entry already exists for the user_uuid
    const dataQuery = `
    SELECT
      users_info.first_name, users_info.last_name, users_info.gender, users_info.pronouns, users_info.jobtitle_name, users_info.website, users_info.birth_date
    FROM users
    JOIN users_info ON users.user_id = users_info.user_id
    WHERE users.user_uuid = $1`;

    const data = await db.query(dataQuery, [user_uuid]);

    if (data.rows.length > 0) {
      res.send(data.rows[0]);
    } else {
      console.log("No user found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user info" });
  }
}

// Create/Update Profile Info
export async function updateProfileInfo(req, res) {
  let profileInfo;
  const {
    user_uuid,
    first_name,
    last_name,
    gender,
    pronouns,
    jobtitle_name,
    website,
    birth_date,
  } = req.body;

  try {
    // Check if an entry already exists for the user_uuid
    const checkUserUUID = await db.query(
      "SELECT users.user_id FROM users WHERE users.user_uuid = $1",
      [user_uuid]
    );
    if (checkUserUUID.rows.length > 0) {
      const result = checkUserUUID.rows[0];
      if (result.user_id) {
        const user_id = result.user_id;
        const checkUserInfo = await db.query(
          "SELECT * FROM users_info WHERE users_info.user_id = $1",
          [user_id]
        );
        if (checkUserInfo.rows.length > 0) {
          const insertInfoQuery = `UPDATE users_info 
          SET first_name = $1, last_name = $2, gender = $3, pronouns = $4, jobtitle_name = $5, website =$6, birth_date = $7
          WHERE user_id = $8
          RETURNING first_name, last_name, gender, pronouns, jobtitle_name, website, birth_date`;

          profileInfo = await db.query(insertInfoQuery, [
            first_name,
            last_name,
            gender,
            pronouns,
            jobtitle_name,
            website,
            birth_date.length > 0 ? birth_date : null,
            user_id,
          ]);

          console.log("Info updated successfully");
        } else {
          const createtInfoQuery = `INSERT INTO users_info 
          (user_id, first_name, last_name, gender, pronouns, jobtitle_name, website, birth_date) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING first_name, last_name, gender, pronouns, jobtitle_name, website, birth_date`;

          profileInfo = await db.query(createtInfoQuery, [
            user_id,
            first_name,
            last_name,
            gender,
            pronouns,
            jobtitle_name,
            website,
            birth_date.length > 0 ? birth_date : null,
          ]);

          console.log("Info created successfully");
        }
      }
    } else {
      console.log("Invalid user");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload or update info" });
  }
}
