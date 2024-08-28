import db from "../../db.js";

const createNewPost = async (req, res) => {
  try {
    const input = req.body;
    let {
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

    // --- INSERT INTO JOB TITLE TABLE ---
    if (!input.jobtitle_exist) {
      const { jobtitle_name } = input;
      const jobTitleResult = await db.query(
        "INSERT INTO jobtitle (jobtitle_name) VALUES ($1) RETURNING jobtitle_id",
        [jobtitle_name]
      );
      jobtitle_id = jobTitleResult.rows[0].jobtitle_id;
      console.log("New job title: ", jobtitle_name);
    }

    // --- INSERT INTO COUNTRY TABLE ---
    if (!input.country_exist) {
      const { country_name } = input;
      const countryResult = await db.query(
        "INSERT INTO country (country_name) VALUES ($1) RETURNING country_id",
        [country_name]
      );
      country_id = countryResult.rows[0].country_id;
      console.log("New country: ", country_name);
    }

    // --- INSERT INTO STATE TABLE ---
    if (!input.state_exist) {
      const { state_name } = input;
      const stateResult = await db.query(
        "INSERT INTO state (country_id, state_name) VALUES ($1, $2) RETURNING state_id",
        [country_id, state_name]
      );
      state_id = stateResult.rows[0].state_id;
      console.log("New state: ", state_name);
    }

    // --- INSERT INTO CITY TABLE ---
    if (!input.city_exist) {
      const { city_name } = input;
      const cityResult = await db.query(
        "INSERT INTO city (country_id, state_id, city_name) VALUES ($1, $2, $3) RETURNING city_id",
        [country_id, state_id, city_name]
      );
      city_id = cityResult.rows[0].city_id;
      console.log("New city: ", city_name);
    }

    // --- INSERT INTO COMPANY TABLE ---
    if (!input.company_exist || (input.company_exist && !input.city_exist)) {
      const { company_name } = input;
      const companyResult = await db.query(
        "INSERT INTO company (city_id, company_name) VALUES ($1, $2) RETURNING company_id",
        [city_id, company_name]
      );
      company_id = companyResult.rows[0].company_id;
      console.log("New company: ", company_name);
    }

    // --- INSERT INTO POST TABLE ---
    const postResult = await db.query(
      "INSERT INTO post (jobtitle_id, experience_id, company_id, model_id, date) VALUES ($1, $2, $3, $4, $5) RETURNING post_id",
      [jobtitle_id, experience_id, company_id, model_id, date]
    );
    const post_id = postResult.rows[0].post_id;

    // --- INSERT INTO POST DETAIL TABLE ---
    await db.query("INSERT INTO postdetail(post_id, contact) VALUES ($1, $2)", [
      post_id,
      link,
    ]);

    console.log("New post created successfully");
    res.status(201).json({ message: "New post created successfully", post_id });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post" });
  }
};

export { createNewPost };
