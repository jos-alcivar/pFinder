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

export { getCountryList };
