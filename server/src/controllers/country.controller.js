import db from "../../db.js";

// --- GET COUNTRIES ---
const getCountryList = async (req, res) => {
  try {
    const data = await db.query("SELECT country_name from country");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET COUNTRY ID  ---
const getCountryId = async (req, res) => {
  try {
    const input = req.body["country"];
    const data = await db.query(
      "SELECT country_id FROM country WHERE country_name LIKE $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length !== 0) {
      const countryID = data.rows[0];
      countryID.found = true;
      res.send(countryID);
    } else {
      const lastID = await db.query(
        "SELECT country_id FROM country ORDER BY country_id DESC LIMIT 1"
      );

      // Handle the case where the table might be empty
      if (lastID.rows.length !== 0) {
        const countryID = lastID.rows[0];
        countryID.found = false;
        res.send(countryID);
      } else {
        res
          .status(404)
          .send({ error: "No job countries found in the database." });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the country ID." });
  }
};
export { getCountryList, getCountryId };
