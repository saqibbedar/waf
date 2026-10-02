// config.js: this file serves one absolute path of dataset file for entire application

import path from "path";
import { fileURLToPath } from "url";

// get absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project Root directory
const ROOT_DIR = path.resolve(__dirname, "..");

// path of /dataset/employees.json file
const EMP_DATASET_FILE_PATH = path.resolve(
  __dirname,
  "..",
  "dataset/employees.json",
);

// path of new_employees.json file
const NEW_EMP_DATASET_FILE_PATH = path.resolve(
  __dirname,
  "..",
  "dataset/new_employees.json",
);

// Part3: logs dir
const LOG_DIR_PATH = path.resolve(__dirname, "..", "log");

export { ROOT_DIR, EMP_DATASET_FILE_PATH, NEW_EMP_DATASET_FILE_PATH, LOG_DIR_PATH };
