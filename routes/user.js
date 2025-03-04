import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import { changePassportValidate, editUserValidate } from "../validator/validate/user.js";
import { changeUserPassword, editUser, getDeliveryInfo, getInfoSetting, saveDeliveryInfo, uploadProfilePhoto } from "../controllers/user.js";
import checkToken from "../middleware/checkToken.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join('/tmp', 'uploads', 'profile'); // Use /tmp directory
    fs.mkdirSync(tempDir, { recursive: true }); // Ensure the directory exists
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamped filenames
  },
});

const upload = multer({ storage });

const userRouter = Router();

userRouter.get("/info-setting", checkToken, getInfoSetting);
userRouter.get("/get-delivery", checkToken, getDeliveryInfo);

userRouter.put("/edit", checkToken, editUserValidate, editUser);
userRouter.put("/change-password", checkToken, changePassportValidate, changeUserPassword);

userRouter.post("/save-delivery", checkToken, saveDeliveryInfo);

userRouter.post("/upload-profile", checkToken, upload.single("image"), uploadProfilePhoto);

export default userRouter;
