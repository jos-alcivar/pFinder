import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.redirect("/register");
        } else {
          try {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [email, hash]
            );
            const user = result.rows[0];
            req.login(user, (err) => {
              if (err) {
                console.error("Error logging in:", err);
                return res.redirect("/register");
              }
              res.redirect("/secrets");
            });
          } catch (err) {
            console.error("Database error:", err);
            res.redirect("/register");
          }
        }
      });
    }
  } catch (err) {
    console.error("Database query error:", err);
    res.redirect("/register");
  }
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const renderHome = (req, res) => {
  res.render("home.ejs");
};

export const renderLogin = (req, res) => {
  res.render("login.ejs");
};

export const renderRegister = (req, res) => {
  res.render("register.ejs");
};

export const renderSecrets = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
};
