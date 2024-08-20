import { Router } from "express";
import {
  getExperienceList,
  getWorkModelList,
} from "../controllers/task.controllers.js";

const router = Router();

// --- ROOT ---
router.get("/", (req, res) => {
  res.send("Nothing to see here");
});

router.get("/experience", getExperienceList);
router.get("/work-model", getWorkModelList);

export default router;
