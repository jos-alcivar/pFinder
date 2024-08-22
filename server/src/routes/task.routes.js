import { Router } from "express";
import {
  getJobTitleId,
  getJobTitleList,
} from "../controllers/jobtitle.controller.js";
import {
  getWorkModelList,
  getWorkModelSelectedIds,
} from "../controllers/workmodel.controller.js";
import {
  getExperienceList,
  getExperienceSelectedIds,
} from "../controllers/experience.controller.js";
import {
  getStateId,
  getStateListbyCountry,
} from "../controllers/state.controller.js";
import {
  getCountryId,
  getCountryList,
} from "../controllers/country.controller.js";
import {
  getCityId,
  getCityListbyState,
} from "../controllers/city.controller.js";
import {
  getCompanyId,
  getCompaniesbyCity,
} from "../controllers/company.controller.js";

const router = Router();

// --- ROOT ---
router.get("/", (req, res) => {
  res.send("Nothing to see here");
});

// --- GET METHODS ---
router.get("/countries", getCountryList);
router.get("/experience-level", getExperienceList);
router.get("/job-titles", getJobTitleList);
router.get("/work-model", getWorkModelList);

// --- POST METHODS ---
router.post("/job-title-id", getJobTitleId);
router.post("/company-id", getCompanyId);
router.post("/companies-by-city", getCompaniesbyCity);
router.post("/country-id", getCountryId);
router.post("/city-id", getCityId);
router.post("/cities-by-states", getCityListbyState);
router.post("/experience-selected-ids", getExperienceSelectedIds);
router.post("/state-id", getStateId);
router.post("/states&provinces-by-country", getStateListbyCountry);
router.post("/workmodel-selected-ids", getWorkModelSelectedIds);

export default router;
