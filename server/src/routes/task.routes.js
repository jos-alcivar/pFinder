import { Router } from "express";
import {
  getJobTitleId,
  getJobTitleList,
} from "../controllers/jobtitle.controller.js";
import { getWorkModelList } from "../controllers/workmodel.controller.js";
import { getExperienceList } from "../controllers/experience.controller.js";
import { getStateListbyCountry } from "../controllers/state.controller.js";
import { getCountryList } from "../controllers/country.controller.js";
import { getCompanyList } from "../controllers/company.controller.js";
import { getCityList } from "../controllers/city.controller.js";

const router = Router();

// --- ROOT ---
router.get("/", (req, res) => {
  res.send("Nothing to see here");
});

// --- GET METHODS ---
router.get("/cities", getCityList);
router.get("/companies", getCompanyList);
router.get("/countries", getCountryList);
router.get("/experience-level", getExperienceList);
router.get("/job-titles", getJobTitleList);
router.get("/work-model", getWorkModelList);

// --- POST METHODS ---
router.post("/job-title-id", getJobTitleId);
router.post("/states&provinces-by-country", getStateListbyCountry);

export default router;
