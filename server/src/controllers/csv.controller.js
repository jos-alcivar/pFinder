// csv.controller.js
import db from "../../db.js";

export async function fetchJobTitleID(jobtitle_name) {
  const processedResults = [];

  try {
    // Query to find the job title by name
    const jobTitleQuery = await db.query(
      "SELECT jobtitle_id FROM jobtitle WHERE jobtitle_name = $1",
      [jobtitle_name]
    );

    if (jobTitleQuery.rows.length > 0) {
      // Job title found
      const jobID = jobTitleQuery.rows[0];
      jobID.jobtitle_exist = true;
      processedResults.push(jobID);
    } else {
      // Job title not found, fetch the last job ID
      const lastIDQuery = await db.query(
        "SELECT jobtitle_id FROM jobtitle ORDER BY jobtitle_id DESC LIMIT 1"
      );

      if (lastIDQuery.rows.length > 0) {
        // Job title table is not empty
        const jobID = lastIDQuery.rows[0];
        jobID.jobtitle_exist = false;
        processedResults.push(jobID);
      } else {
        // Job title table is empty
        processedResults.push({
          message: "No job titles found in the database.",
        });
      }
    }
  } catch (err) {
    console.error("Error executing query", err);
    processedResults.push({ error: "Error executing query" });
  }

  return processedResults;
}

export async function fetchCountryID(country_name) {
  const processedResults = [];

  try {
    // Query to find the country_id by name
    const countryNameQuery = await db.query(
      "SELECT country_id FROM country WHERE country_name LIKE $1",
      [country_name]
    );

    if (countryNameQuery.rows.length > 0) {
      // Country found
      const countryID = countryNameQuery.rows[0];
      countryID.country_exist = true;
      processedResults.push(countryID);
    } else {
      // Country not found, fetch the last country ID
      const lastIDQuery = await db.query(
        "SELECT country_id FROM country ORDER BY country_id DESC LIMIT 1"
      );

      if (lastIDQuery.rows.length > 0) {
        // Country table is not empty
        const countryID = lastIDQuery.rows[0];
        countryID.country_exist = false;
        processedResults.push(countryID);
      } else {
        // Country table is empty
        processedResults.push({
          message: "No countries found in the database.",
        });
      }
    }
  } catch (err) {
    console.error("Error executing query", err);
    processedResults.push({ error: "Error executing query" });
  }

  return processedResults;
}

export async function fetchStateID(state_name) {
  const processedResults = [];

  try {
    // Query to find the state_id by name
    const stateNameQuery = await db.query(
      "SELECT state_id FROM state WHERE state_name LIKE $1",
      [state_name]
    );

    if (stateNameQuery.rows.length > 0) {
      // State found
      const stateID = stateNameQuery.rows[0];
      stateID.state_exist = true;
      processedResults.push(stateID);
    } else {
      // State not found, fetch the last state ID
      const lastIDQuery = await db.query(
        "SELECT state_id FROM state ORDER BY state_id DESC LIMIT 1"
      );

      if (lastIDQuery.rows.length > 0) {
        // State table is not empty
        const stateID = lastIDQuery.rows[0];
        stateID.state_exist = false;
        processedResults.push(stateID);
      } else {
        // State table is empty
        processedResults.push({
          message: "No states found in the database.",
        });
      }
    }
  } catch (err) {
    console.error("Error executing query", err);
    processedResults.push({ error: "Error executing query" });
  }

  return processedResults;
}

export async function fetchCityID(city_name) {
  const processedResults = [];

  try {
    // Query to find the city_id by name
    const cityNameQuery = await db.query(
      "SELECT city_id FROM city WHERE city_name LIKE $1",
      [city_name]
    );

    if (cityNameQuery.rows.length > 0) {
      // City found
      const cityID = cityNameQuery.rows[0];
      cityID.city_exist = true;
      processedResults.push(cityID);
    } else {
      // City not found, fetch the last city ID
      const lastIDQuery = await db.query(
        "SELECT city_id FROM city ORDER BY city_id DESC LIMIT 1"
      );

      if (lastIDQuery.rows.length > 0) {
        // City table is not empty
        const cityID = lastIDQuery.rows[0];
        cityID.city_exist = false;
        processedResults.push(cityID);
      } else {
        // City table is empty
        processedResults.push({
          message: "No cities found in the database.",
        });
      }
    }
  } catch (err) {
    console.error("Error executing query", err);
    processedResults.push({ error: "Error executing query" });
  }

  return processedResults;
}

export async function fetchCompanyID(company_name) {
  const processedResults = [];

  try {
    // Query to find the company_id by name
    const companyNameQuery = await db.query(
      "SELECT company_id FROM company WHERE company_name LIKE $1",
      [company_name]
    );

    if (companyNameQuery.rows.length > 0) {
      // Company found
      const companyID = companyNameQuery.rows[0];
      companyID.company_exist = true;
      processedResults.push(companyID);
    } else {
      // Company not found, fetch the last company ID
      const lastIDQuery = await db.query(
        "SELECT company_id FROM company ORDER BY company_id DESC LIMIT 1"
      );

      if (lastIDQuery.rows.length > 0) {
        // Company table is not empty
        const companyID = lastIDQuery.rows[0];
        companyID.company_exist = false;
        processedResults.push(companyID);
      } else {
        // Company table is empty
        processedResults.push({
          message: "No companies found in the database.",
        });
      }
    }
  } catch (err) {
    console.error("Error executing query", err);
    processedResults.push({ error: "Error executing query" });
  }

  return processedResults;
}

export async function fetchExperienceID(experience) {
  let experience_id;
  try {
    if (experience) {
      const input = experience.split(",");
      const placeholders = input.map((_, index) => `$${index + 1}`).join(", ");
      const query = `SELECT experience_id FROM experience WHERE level IN (${placeholders})`;
      // Query to find the experience_id by name
      const experienceQuery = await db.query(query, input);
      experience_id = experienceQuery.rows.map((e) => e.experience_id);
    }
  } catch (err) {
    console.error("Error executing query", err);
  }

  return experience_id;
}

export async function fetchModelID(model) {
  let model_id;
  try {
    if (model) {
      const input = model.split(",");
      const placeholders = input.map((_, index) => `$${index + 1}`).join(", ");
      const query = `SELECT model_id FROM model WHERE model_name IN (${placeholders})`;
      // Query to find the model_id by name
      const modelQuery = await db.query(query, input);
      model_id = modelQuery.rows.map((m) => m.model_id);
    }
  } catch (err) {
    console.error("Error executing query", err);
  }

  return model_id;
}

export async function createNewPost(post) {
  try {
    const input = post;
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
      software,
      description,
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
    await db.query(
      "INSERT INTO postdetail(post_id, contact, software, description) VALUES ($1, $2, $3, $4)",
      [post_id, link, software.split(", "), description]
    );

    console.log("New post created successfully", post_id);
  } catch (err) {
    console.log(err, "An error occurred while creating the post");
  }
}
