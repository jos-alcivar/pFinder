import db from "../../db.js";

// --- GET EXPERIENCE LEVELS ---
const getExperienceList = async (req, res) => {
  try {
    const data = await db.query("SELECT level FROM experience");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

export { getExperienceList };
