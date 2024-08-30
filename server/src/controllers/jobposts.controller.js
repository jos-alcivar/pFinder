import db from "../../db.js";
// --- SQL COMMANDS ---
const columns =
  "post.post_id, post.date, jobtitle.jobtitle_name, ARRAY_AGG(DISTINCT experience.level ORDER BY experience.level) AS experience, company.company_name, country.country_name, state.state_name, city.city_name, ARRAY_AGG(DISTINCT model.model_name ORDER BY model.model_name) AS model";
const join_jobtitle =
  "JOIN jobtitle ON post.jobtitle_id = jobtitle.jobtitle_id";
const join_experience =
  "JOIN experience ON experience.experience_id = ANY(post.experience_id)";
const join_company = "JOIN company ON post.company_id = company.company_id";
const join_city = "JOIN city ON company.city_id = city.city_id";
const join_state = "JOIN state ON city.state_id = state.state_id";
const join_country = "JOIN country ON state.country_id = country.country_id";
const join_model = "JOIN model ON model.model_id = ANY(post.model_id)";
const group_by =
  "GROUP BY post.post_id, post.date, jobtitle.jobtitle_name, company.company_name, country.country_name, state.state_name, city.city_name";
const order_by = "ORDER BY post.post_id DESC";
// --- QUERY TO GET ALL POSTS ---
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
`;

// --- GET JOB POSTS ---
const getJobPostDefault = async (req, res) => {
  try {
    const data = await db.query(`${query} ${group_by} ${order_by}`);
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET JOB POSTS ---
const getJobPostFiltered = async (req, res) => {
  const {
    filterByLocation,
    filterByJobTitle,
    filterByCompany,
    filterByExperience,
    filterByModel,
    filterByDate,
  } = req.body;

  // Add filter default value
  let queryFilter = `${query} WHERE 1=1`;
  let queryParams = [];

  // --- Filter by Country ---
  if (filterByLocation && filterByLocation.length > 0) {
    queryParams.push(...filterByLocation);
    const placeholders = filterByLocation
      .map(
        (_, index) =>
          `$${queryParams.length - filterByLocation.length + index + 1}`
      )
      .join(", ");
    queryFilter += ` AND country.country_name IN (${placeholders})`;
  }
  // --- Filter by Job Title ---
  if (filterByJobTitle && filterByJobTitle.length > 0) {
    queryParams.push(...filterByJobTitle);
    const placeholders = filterByJobTitle
      .map(
        (_, index) =>
          `$${queryParams.length - filterByJobTitle.length + index + 1}`
      )
      .join(", ");
    queryFilter += ` AND jobtitle.jobtitle_name IN (${placeholders})`;
  }
  // --- Filter by Company ---
  if (filterByCompany && filterByCompany.length > 0) {
    queryParams.push(...filterByCompany);
    const placeholders = filterByCompany
      .map(
        (_, index) =>
          `$${queryParams.length - filterByCompany.length + index + 1}`
      )
      .join(", ");
    queryFilter += ` AND company.company_name IN (${placeholders})`;
  }
  // --- Filter by Experience ---
  if (filterByExperience && filterByExperience.length > 0) {
    queryParams.push(...filterByExperience);
    const placeholders = filterByExperience
      .map(
        (_, index) =>
          `$${queryParams.length - filterByExperience.length + index + 1}`
      )
      .join(", ");
    queryFilter += ` AND experience.level IN (${placeholders})`;
  }
  // --- Filter by Work Model ---
  if (filterByModel && filterByModel.length > 0) {
    queryParams.push(...filterByModel);
    const placeholders = filterByModel
      .map(
        (_, index) =>
          `$${queryParams.length - filterByModel.length + index + 1}`
      )
      .join(", ");
    queryFilter += ` AND model.model_name IN (${placeholders})`;
  }
  // --- Filter by Date ---
  if (filterByDate && filterByDate > 0) {
    const placeholders = `$${queryParams.length}`;
    queryFilter += ` AND post.date >= CURRENT_DATE - INTERVAL '${filterByDate} days'`;
  }

  // Add grouping and ordering
  queryFilter += ` ${group_by} ${order_by}`;
  console.log("query params", queryParams);
  try {
    const data = await db.query(queryFilter, queryParams);
    const list = data.rows;
    console.log("number of entries", data.rows.length);
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

export { getJobPostDefault, getJobPostFiltered };
