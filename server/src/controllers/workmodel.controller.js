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

export { getWorkModelList };
