import mongoose from "mongoose";
import { RemoteResume, LocalResume } from "../models/index.js";

export const getResumes = async (req, res) => {
    const resumes = await RemoteResume.find();
    res.render("home", { resumes });
};

export const addForm = (req, res) => {
    res.render("createCV");
};

export const createResume = async (req, res) => {
    try {
        const arrayFields = ["qualifications", "certifications", "experience", "skills", "languages", "hobbies"];
        const data = { ...req.body };

        arrayFields.forEach((field) => {
            data[field] = (req.body[field] || "")
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        });

        data.image = req.files?.image?.[0]?.filename || "";
        data.documents = req.files?.documents?.map((f) => f.filename) || [];

        const id = new mongoose.Types.ObjectId();
        await RemoteResume.create({ ...data, _id: id });
        await LocalResume.create({ ...data, _id: id });

        res.redirect("/resumes");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getResume = async (req, res) => {
    const resume = await RemoteResume.findById(req.params.id);
    if (!resume) return res.status(404).send("Resume not found");
    res.render("details", { resume });
};

export const editForm = async (req, res) => {
    const resume = await RemoteResume.findById(req.params.id);
    if (!resume) return res.status(404).send("Resume not found");
    res.render("editCV", { resume });
};

export const updateResume = async (req, res) => {
    try {
        const arrayFields = ["qualifications", "certifications", "experience", "skills", "languages", "hobbies"];
        const data = { ...req.body };

        arrayFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                data[field] = req.body[field]
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean);
            }
        });

        if (req.files?.image?.[0]) data.image = req.files.image[0].filename;
        if (req.files?.documents?.length) data.documents = req.files.documents.map((f) => f.filename);

        await RemoteResume.findByIdAndUpdate(req.params.id, data);
        await LocalResume.findByIdAndUpdate(req.params.id, data);

        res.redirect("/resumes");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteResume = async (req, res) => {
    try {
        await RemoteResume.findByIdAndDelete(req.params.id);
        await LocalResume.findByIdAndDelete(req.params.id);
        res.redirect("/resumes");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
