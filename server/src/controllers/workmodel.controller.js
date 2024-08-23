import db from "../../db.js";

// --- GET WORK MODELS ---
const getWorkModelList = async (req, res) => {
  try {
    const data = await db.query("SELECT model_name FROM model");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET WORK MODEL SELECTED ID  ---
const getWorkModelSelectedIds = async (req, res) => {
  try {
    if (req.body["model"][0]) {
      const input = req.body["model"];
      const placeholders = input.map((_, index) => `$${index + 1}`).join(", ");
      const query = `SELECT model_id FROM model WHERE model_name IN (${placeholders})`;

      const data = await db.query(query, input);
      const list = data.rows.map((m) => m.model_id);
      res.send(list);
    } else {
      console.log("empty model array");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the work model ID." });
  }
};

export { getWorkModelList, getWorkModelSelectedIds };
