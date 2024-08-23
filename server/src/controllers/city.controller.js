import db from "../../db.js";

// --- GET CITY ID  ---
const getCityId = async (req, res) => {
  try {
    const input = req.body["city"];
    const data = await db.query(
      "SELECT city_id FROM city WHERE city_name LIKE $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length !== 0) {
      const cityID = data.rows[0];
      cityID.found = true;
      res.send(cityID);
    } else {
      const lastID = await db.query(
        "SELECT city_id FROM city ORDER BY city_id DESC LIMIT 1"
      );

      // Handle the case where the table might be empty
      if (lastID.rows.length !== 0) {
        const cityID = lastID.rows[0];
        cityID.found = false;
        res.send(cityID);
      } else {
        res.status(404).send({ error: "No cities found in the database." });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the city ID." });
  }
};

// --- GET CITIES BY STATE ---
const getCityListbyState = async (req, res) => {
  try {
    const input = req.body["state_id"];
    const data = await db.query(
      "SELECT city_name from city WHERE state_id = $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length === 0) {
      return res.status(404).send({ error: "Value not found" });
    }
    const citiesList = data.rows;
    res.send(citiesList);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the cities list." });
  }
};

export { getCityId, getCityListbyState };
