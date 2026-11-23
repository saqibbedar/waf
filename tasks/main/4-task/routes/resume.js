import express from "express";
import {
    getResumes,
    addForm,
    createResume,
    getResume,
    editForm,
    updateResume,
    deleteResume,
} from "../controllers/index.js";
import { upload } from "../config/index.js";

const router = express.Router();

const uploadFields = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "documents", maxCount: 10 },
]);

router.get("/", getResumes);
router.get("/addNew", addForm);
router.post("/", uploadFields, createResume);
router.get("/:id", getResume);
router.get("/:id/edit", editForm);
router.patch("/:id", uploadFields, updateResume);
router.delete("/:id", deleteResume);

export default router;
