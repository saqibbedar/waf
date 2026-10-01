// append_file: a generic function that writes data async to any non-binary files based on passed arguments 

import fs from "fs";

// append_file
// accepts file_path, and data
// file_path: location of file to write the data includes the extension of file (already existing)
// data: content to be written in the file
const append_file = async (file_path, data) => {
  try {
    await fs.promises.appendFile(file_path, data, "utf-8");
  } catch (error) {
    console.error(error);
  }
};

export default append_file;
