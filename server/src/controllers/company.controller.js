import db from "../../db.js";

// --- GET COMPANY ID  ---
const getCompanyId = async (req, res) => {
  try {
    const { company_name, city_id } = req.body;
    const data = await db.query(
      "SELECT company_id FROM company WHERE company_name LIKE $1 AND city_id = $2",
      [company_name, city_id]
    );

    // Check if any row was returned
    if (data.rows.length !== 0) {
      const companyID = data.rows[0];
      companyID.found = true;
      res.send(companyID);
    } else {
      const lastID = await db.query(
        "SELECT company_id FROM company ORDER BY company_id DESC LIMIT 1"
      );

      // Handle the case where the table might be empty
      if (lastID.rows.length !== 0) {
        const companyID = lastID.rows[0];
        companyID.found = false;
        res.send(companyID);
      } else {
        res.status(404).send({ error: "No companies found in the database." });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the company ID." });
  }
};

// --- GET COMPANIES BY CITY ---
const getCompaniesbyCity = async (req, res) => {
  try {
    const input = req.body["city_id"];
    const data = await db.query(
      "SELECT company_name from company WHERE city_id = $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length === 0) {
      return res.status(404).send({ error: "Value not found" });
    }
    const companiesList = data.rows;
    res.send(companiesList);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "An error occurred while retrieving the companies list.",
    });
  }
};

export { getCompanyId, getCompaniesbyCity };
