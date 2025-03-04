import {
  continueOrder,
  createDraft,
  deleteDraft,
  duplicateDraft,
  getDraftsList,
  getImagesDraft,
  setQuantity,
  updateDraft,
  uploadDesign,
  uploadLabel,
  uploadNeck,
  uploadPackage,
} from "../controllers/drafts.js";
import { Router } from "express";
import checkToken from "../middleware/checkToken.js";
import multer from "multer";

// Configure multer for in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

const draftsRouter = Router();

draftsRouter.get("/list", checkToken, getDraftsList);
draftsRouter.get("/continue-order", checkToken, continueOrder);

draftsRouter.post("/duplicate", checkToken, duplicateDraft);
draftsRouter.post("/create", checkToken, createDraft);
draftsRouter.post("/update", checkToken, updateDraft);
draftsRouter.delete("/delete", checkToken, deleteDraft);

draftsRouter.post("/upload-design", checkToken, upload.single("file"), uploadDesign);
draftsRouter.post("/upload-label", checkToken, upload.single("file"), uploadLabel);
draftsRouter.post("/upload-neck", checkToken, upload.single("file"), uploadNeck);
draftsRouter.post("/upload-package", checkToken, upload.single("file"), uploadPackage);

draftsRouter.get("/images", checkToken, getImagesDraft);
draftsRouter.get("/set-quantity", checkToken, setQuantity);

export default draftsRouter;
