import db from "../../db.js";

db.connect();

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

// --- GET STATES/PROVINCES ---
const getStateListbyCountry = async (req, res) => {
  try {
    const input = req.body["value"];
    const filter = await db.query(
      "SELECT country_id FROM country WHERE country_name LIKE $1",
      [input]
    );

    // Check if any row was returned
    if (filter.rows.length === 0) {
      return res.status(404).send({ error: "Value not found" });
    }
    const filterData = filter.rows[0];
    const country_id = filterData.country_id;

    const data = await db.query("SELECT * from state WHERE country_id = $1", [
      country_id,
    ]);

    const list = data.rows;
    console.log(list);

    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};
