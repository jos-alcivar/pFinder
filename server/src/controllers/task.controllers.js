import db from "../../db.js";

db.connect();

// --- GET JOB TITLES ---
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

// --- GET EXPERIENCE LEVELS ---
const getExperienceList = async (req, res) => {
  try {
    const data = await db.query("SELECT level FROM experience");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET COUNTRIES ---
const getCountryList = async (req, res) => {
  try {
    const data = await db.query("SELECT country_name from country");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET STATES ---
const getStateList = async (req, res) => {
  try {
    const data = await db.query("SELECT state_name from state");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

// --- GET CITIES ---
const getCityList = async (req, res) => {
  try {
    const data = await db.query("SELECT city_name from city");
    const list = data.rows;
    res.send(list);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

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

export {
  getJobTitleList,
  getExperienceList,
  getCountryList,
  getStateList,
  getCityList,
  getCompanyList,
  getWorkModelList,
};
