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

// --- GET EXPERIENCE SELECTED ID  ---
const getExperienceSelectedIds = async (req, res) => {
  try {
    if (req.body["experience"][0]) {
      const input = req.body["experience"];
      const placeholders = input.map((_, index) => `$${index + 1}`).join(", ");
      const query = `SELECT experience_id FROM experience WHERE level IN (${placeholders})`;

      const data = await db.query(query, input);
      const list = data.rows.map((e) => e.experience_id);
      res.send(list);
    } else {
      console.log("empty exp array");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the experience ID." });
  }
};

export { getExperienceList, getExperienceSelectedIds };
