import { Storage } from "@google-cloud/storage";
import Draft from "../models/draft.js";
import Product from "../models/product.js";
import setBasePrice from "../services/setPrice.js";
import config from "../config.js"; // Import the config file

// Initialize Google Cloud Storage client
const storage = new Storage({
  credentials: config.googleApplicationCredentials
});
const BUCKET_NAME = "ceriga-storage-bucket";
const bucket = storage.bucket(BUCKET_NAME);
// Upload files to Vercel Blob
const uploadFileToGCS = async (file, draftId, field) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided"));
    }

    const gcsFileName = `${draftId}/${field}/${Date.now()}_${file.originalname}`;
    const blob = bucket.file(gcsFileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${gcsFileName}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};
const getDraftsList = async (req, res) => {
  try {
    const draftsList = await Draft.find(
      { userId: req.id },
      { name: 1, productType: 1, createAt: 1, color: 1 }
    ).lean()
    if (draftsList) {
      res.status(200).json(draftsList)
    } else {
      res.status(404).json({
        message: "Drafts not found"
      })
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

const createDraft = async (req, res) => {
  const { draft } = req.body

  try {
    const newDraft = new Draft({ ...draft, userId: req.id, createdAt: new Date(), status: "Draft" })
    if (draft.productType !== null) { await newDraft.save() }
    const product = await Product.findOne({ name: draft.productType }, { moq: 1 }).lean()
    res.status(200).json({ id: newDraft._id, moq: product.moq || 50 })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

const updateDraft = async (req, res) => {
  const { draft } = req.body
  try {
    const currentDraft = await Draft.findById(draft.draftId).lean()
    console.log(draft)
    if (currentDraft) {
      const product = await Product.findOne({ name: draft.productType }, { startingPrice: 1 }).lean()
      const subtotal = setBasePrice(currentDraft, product.startingPrice)
      await Draft.findByIdAndUpdate(
        draft.draftId,
        {
          ...draft,
          subtotal,
          createdAt: new Date()
        },
        { new: true }
      )
      res.status(200).json({
        message: "Draft updated",
        subtotal
      })
    } else {
      res.status(404).json({
        message: "Not found"
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

const duplicateDraft = async (req, res) => {
  const { draftId } = req.query
  try {
    const draftInfo = await Draft.findById(draftId).lean()
    if (draftInfo) {
      const { _id, ...draftData } = draftInfo;
      const newDraft = new Draft({ ...draftData })
      await newDraft.save()
      res.status(200).json(newDraft)
    } else {
      res.status(404).json({
        message: "Draft not found"
      })
    }
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteDraft = async (req, res) => {
  const { draftId } = req.query;
  try {
    const candidate = await Draft.findById(draftId, { _id: 1, designUploads: 1, labelUploads: 1, neckUploads: 1, packageUploads: 1 }).lean();
    if (candidate) {
      await Draft.findByIdAndDelete(draftId);

      // Delete files from Google Cloud Storage
      const deleteFiles = async (fileUrls) => {
        for (const fileUrl of fileUrls) {
          const fileName = fileUrl.split(`${BUCKET_NAME}/`)[1];
          try {
            await bucket.file(fileName).delete();
            console.log(`Successfully deleted ${fileName}`);
          } catch (error) {
            console.error(`Error deleting file ${fileName}:`, error);
          }
        }
      };

      await Promise.all([
        deleteFiles(candidate.designUploads || []),
        deleteFiles(candidate.labelUploads || []),
        deleteFiles(candidate.neckUploads || []),
        deleteFiles(candidate.packageUploads || []),
      ]);

      res.status(200).json(draftId);
    } else {
      res.status(404).json({ message: "Draft not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};

const continueOrder = async (req, res) => {
  const { draftId } = req.query
  try {
    const candidate = await Draft.findById(draftId).lean()
    res.status(200).json({ ...candidate, draftId })
  } catch (e) {
    res.status(500).json(e)
  }
}

// Upload Design Handler
const uploadFile = async (req, res, field) => {
  const draftId = req.query.draftId;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = await uploadFileToGCS(req.file, draftId, field);

    // Update the draft with the new file URL
    const update = {};
    update[field] = fileUrl;

    await Draft.findByIdAndUpdate(draftId, { $push: update }, { new: true });

    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  } catch (error) {
    console.error(`Error in upload${field}:`, error);
    res.status(500).json({ message: error.message });
  }
};

const uploadDesign = async (req, res) => uploadFile(req, res, "designUploads");
const uploadLabel = async (req, res) => uploadFile(req, res, "labelUploads");
const uploadNeck = async (req, res) => uploadFile(req, res, "neckUploads");
const uploadPackage = async (req, res) => uploadFile(req, res, "packageUploads");


const getImagesDraft = async (req, res) => {
  const { draftId, type } = req.query;
  console.log(req.query);

  try {
    const draftCandidate = await Draft.findById(draftId).lean();
    if (draftCandidate) {
      res.status(200).json(draftCandidate[type])
    } else {
      res.status(404).json({ message: "Draft not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred while fetching the draft.", error: e.message });
  }
};

const setQuantity = async (req, res) => {
  const { draftId } = req.query
  try {
    const draft = await Draft.findById(draftId).lean()
    if (draft) {
      const product = await Product.findOne({ name: draft.productType }).lean()
      let cost = product.startingPrice

      res.status(200).json({ cost })
    } else {
      res.status(404).json({ message: "Draft not found" });
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred while", error: e.message });
  }
}

export {
  getDraftsList,
  createDraft,
  updateDraft,
  duplicateDraft,
  deleteDraft,
  continueOrder,
  uploadDesign,
  uploadLabel,
  uploadNeck,
  getImagesDraft,
  setQuantity,
  uploadPackage,
  //designUpload,
  //labelUpload,
  //neckUpload,
  //packageUpload
}

