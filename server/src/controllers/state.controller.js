import db from "../../db.js";

// --- GET STATE ID  ---
const getStateId = async (req, res) => {
  try {
    const input = req.body["state"];
    const data = await db.query(
      "SELECT state_id FROM state WHERE state_name LIKE $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length !== 0) {
      const stateID = data.rows[0];
      stateID.found = true;
      res.send(stateID);
    } else {
      const lastID = await db.query(
        "SELECT state_id FROM state ORDER BY state_id DESC LIMIT 1"
      );

      // Handle the case where the table might be empty
      if (lastID.rows.length !== 0) {
        const stateID = lastID.rows[0];
        stateID.found = false;
        res.send(stateID);
      } else {
        res.status(404).send({ error: "No job states found in the database." });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the state ID." });
  }
};

// --- GET STATES/PROVINCES BY COUNTRY ---
const getStateListbyCountry = async (req, res) => {
  try {
    const input = req.body["country_id"];
    const data = await db.query(
      "SELECT state_name from state WHERE country_id = $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length === 0) {
      return res.status(404).send({ error: "Value not found" });
    }
    const statesList = data.rows;
    console.log(statesList);
    res.send(statesList);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the state list." });
  }
};

export { getStateListbyCountry, getStateId };
