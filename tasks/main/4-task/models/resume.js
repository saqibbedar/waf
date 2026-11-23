import mongoose from "mongoose";
import { remoteDB, localDB } from "../config/index.js";

const resumeSchema = new mongoose.Schema(
    {
        fullname: String,
        image: String,
        contact: String,
        email: String,
        qualifications: [String],
        certifications: [String],
        experience: [String],
        skills: [String],
        languages: [String],
        hobbies: [String],
        researchStatement: String,
        documents: [String],
        summary: String,
    },
    { timestamps: true }
);

export const RemoteResume = remoteDB.model("Resume", resumeSchema, "resume");
export const LocalResume = localDB.model("Resume", resumeSchema, "resume");

export { RemoteResume as default };
