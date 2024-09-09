import { Router } from "express";
import {
  createNewUser,
  getProfilePhoto,
  checkUserExists,
} from "../controllers/user.controller.js";

const routerUser = Router();

// Register new user
routerUser.post("/exists", checkUserExists);
routerUser.post("/register", createNewUser);
routerUser.post("/get-profile-photo", getProfilePhoto);

export default routerUser;
