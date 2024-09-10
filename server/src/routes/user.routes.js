import { Router } from "express";
import multer from "multer";
import {
  createNewUser,
  getProfilePhoto,
  checkUserExists,
  UploadProfilePhoto,
} from "../controllers/user.controller.js";

const routerUser = Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use multer for handling file uploads

// user routes
routerUser.get("/:user_uuid/photo", getProfilePhoto);
routerUser.post("/exists", checkUserExists);
routerUser.post("/register", createNewUser);
routerUser.post(
  "/upload-profile-photo",
  upload.single("photo"),
  UploadProfilePhoto
);

export default routerUser;
