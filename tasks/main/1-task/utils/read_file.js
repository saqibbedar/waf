// read_file.js: a utility function that reads the ./public/data.json file's contents and returns parsed data an array of objects.

import fs from "fs";
import path from "path";

// read_file
// accepts a path_url (location of data.json file)
// return an array of objects
const read_file = async (path_url) => {
  try {
    // file to read data from
    const file_path = path.resolve(path_url);
    // console.log(file_path)

    // uncomment to verify file if it is existing abs or not?
    // console.log(path.isAbsolute(file_path))

    // read file contents asynchronously
    const contents = await fs.promises.readFile(file_path, "utf-8");

    if (!contents) {
      throw Error;
    }

    // console.log(JSON.parse(contents))

    // return an array of objects
    return JSON.parse(contents);
  } catch (error) {
    console.error(`Error in accessing file at ${filepath} \n${error}`);
  }
};

export default read_file;
