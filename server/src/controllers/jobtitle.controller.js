import db from "../../db.js";

// --- GET ALL JOB TITLES ---
const getJobTitleList = async (req, res) => {
  try {
    const data = await db.query("SELECT jobtitle_name from jobtitle");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET JOB TITLE ID  ---
const getJobTitleId = async (req, res) => {
  try {
    const input = req.body["jobtitle"];
    const data = await db.query(
      "SELECT jobtitle_id FROM jobtitle WHERE jobtitle_name LIKE $1",
      [input]
    );

    // Check if any row was returned
    if (data.rows.length !== 0) {
      const jobID = data.rows[0];
      jobID.found = true;
      res.send(jobID);
    } else {
      const lastID = await db.query(
        "SELECT jobtitle_id FROM jobtitle ORDER BY jobtitle_id DESC LIMIT 1"
      );

      // Handle the case where the table might be empty
      if (lastID.rows.length !== 0) {
        const jobID = lastID.rows[0];
        jobID.found = false;
        res.send(jobID);
      } else {
        res.status(404).send({ error: "No job titles found in the database." });
      }
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: "An error occurred while retrieving the job title ID." });
  }
};

export { getJobTitleList, getJobTitleId };
