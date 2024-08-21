import db from "../../db.js";

// --- GET CITIES ---
const getCityList = async (req, res) => {
  try {
    const data = await db.query("SELECT city_name from city");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

export { getCityList };
