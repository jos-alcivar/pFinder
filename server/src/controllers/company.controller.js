import db from "../../db.js";

// --- GET COMPANY ---
const getCompanyList = async (req, res) => {
  try {
    const data = await db.query("SELECT company_name from company");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

export { getCompanyList };
