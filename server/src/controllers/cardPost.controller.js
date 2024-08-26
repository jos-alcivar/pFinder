import db from "../../db.js";

// --- GET JOB POSTS ---
const getJobPostDefault = async (req, res) => {
  try {
    // --- SQL COMMANDS ---
    const columns =
      "jobtitle.jobtitle_name, ARRAY_AGG(DISTINCT experience.level ORDER BY experience.level) AS experience, company.company_name, country.country_name, state.state_name, city.city_name, ARRAY_AGG(DISTINCT model.model_name ORDER BY model.model_name) AS model";
    const join_jobtitle =
      "JOIN jobtitle ON post.jobtitle_id = jobtitle.jobtitle_id";
    const join_experience =
      "JOIN experience ON experience.experience_id = ANY(post.experience_id)";
    const join_company = "JOIN company ON post.company_id = company.company_id";
    const join_city = "JOIN city ON company.city_id = city.city_id";
    const join_state = "JOIN state ON city.state_id = state.state_id";
    const join_country =
      "JOIN country ON state.country_id = country.country_id";
    const join_model = "JOIN model ON model.model_id = ANY(post.model_id)";
    const group_by =
      "GROUP BY jobtitle.jobtitle_name, company.company_name, country.country_name, state.state_name, city.city_name";
    // --- MERGE INTO ONE STRING ---
    const query = `
      SELECT ${columns}
      FROM post
      ${join_jobtitle}
      ${join_experience}
      ${join_company}
      ${join_city}
      ${join_state}
      ${join_country}
      ${join_model}
      ${group_by}
    `;

    const data = await db.query(query);
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

export { getJobPostDefault };
