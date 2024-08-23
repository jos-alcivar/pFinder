import db from "../../db.js";

const createNewPost = async (req, res) => {
  try {
    let temp_id;
    const input = req.body;
    const {
      jobtitle_id,
      experience_id,
      country_id,
      state_id,
      city_id,
      company_id,
      model_id,
      date,
      link,
    } = input;

    // --- GET LAST POST ID ---
    const lastID = await db.query(
      "SELECT post_id FROM post ORDER BY post_id DESC LIMIT 1"
    );
    if (lastID.rows.length === 0) {
      temp_id = 1;
    } else {
      temp_id = lastID.rows[0];
    }

    // --- ADD ROW IN JOB TITLE TABLE ---
    if (!input.jobtitle_exist) {
      const { jobtitle_name } = input;
      await db.query("INSERT INTO jobtitle (jobtitle_name) VALUES $1", [
        jobtitle_name,
      ]);
      console.log("New job title: ", jobtitle_name);
    }
    // --- ADD ROW IN COUNTRY TABLE ---
    if (!input.country_exist) {
      const { country_name } = input;
      await db.query("INSERT INTO country (country_name) VALUES $1", [
        country_name,
      ]);
      console.log("New country: ", country_name);
    }
    // --- ADD ROW IN STATE TABLE ---
    if (!input.state_exist) {
      const { state_name } = input;
      await db.query(
        "INSERT INTO state (country_id, state_name) VALUES ($1, $2)",
        [country_id, state_name]
      );
      console.log("New state: ", state_name);
    }
    // --- ADD ROW IN CITY TABLE ---
    if (!input.city_exist) {
      const { city_name } = input;
      await db.query(
        "INSERT INTO city (country_id, state_id, city_name) VALUES ($1, $2, $3)",
        [country_id, state_id, city_name]
      );
      console.log("New city: ", city_name);
    }
    // --- ADD ROW IN JOB COMPANY TABLE ---
    if (!input.company_exist) {
      const { company_name } = input;
      await db.query(
        "INSERT INTO state (city_id, company_name) VALUES ($1, $2)",
        [city_id, company_name]
      );
      console.log("New company: ", company_name);
    }

    /// --- ADD ROW IN POST TABLE ---
    await db.query(
      "INSERT INTO post (jobtitle_id, experience_id, company_id, model_id, date, postdetail_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [jobtitle_id, experience_id, company_id, model_id, date, temp_id]
    );
    /// --- ADD ROW IN POST DETAIL TABLE ---
    await db.query("INSERT INTO postdetail(contact) VALUES $1", [link]);
  } catch (err) {
    console.log(err);
  }
};

export { createNewPost };
