import {
  createNewPost,
  fetchCityID,
  fetchCompanyID,
  fetchCountryID,
  fetchExperienceID,
  fetchJobTitleID,
  fetchModelID,
  fetchStateID,
} from "../controllers/csv.controller.js";
import { readCSVFile } from "./csv.reader.js";

export const readAndProcessCSV = async () => {
  try {
    const filePath = "../local/db/job_listing_formated.csv";
    const results = await readCSVFile(filePath);

    for (const row of results) {
      try {
        const jobTitleData = await fetchJobTitleID(row["jobtitle_name"]);
        const countryData = await fetchCountryID(row["country_name"]);
        const stateData = await fetchStateID(row["state_name"]);
        const cityData = await fetchCityID(row["city_name"]);
        const companyData = await fetchCompanyID(row["company_name"]);
        const experienceData = await fetchExperienceID(row["experience"]);
        const modelData = await fetchModelID(row["model"]);

        if (jobTitleData.length > 0) {
          Object.assign(row, jobTitleData[0]);
        }

        if (countryData.length > 0) {
          Object.assign(row, countryData[0]);
        }

        if (stateData.length > 0) {
          Object.assign(row, stateData[0]);
        }

        if (cityData.length > 0) {
          Object.assign(row, cityData[0]);
        }

        if (companyData.length > 0) {
          Object.assign(row, companyData[0]);
        }

        if (experienceData.length > 0) {
          row.experience_id = experienceData;
        }

        if (modelData.length > 0) {
          row.model_id = modelData;
        }

        createNewPost(row);
      } catch (err) {
        console.error("Error processing row:", err);
      }
    }
  } catch (err) {
    console.error("Error processing CSV file:", err);
  }
};
