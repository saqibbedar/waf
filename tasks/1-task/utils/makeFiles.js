import fs from "fs";
import path from "path";

// makeFIles: create files at user desired location
//
// file_folder: folder where user wants to make a file in.
// file_prefix: an array of file prefix
function makeFiles(file_folder, file_prefix) {
  file_prefix.forEach((prefix) => {
    // create files if they are not already existing
    if (!fs.existsSync(`${file_folder}/${prefix}.txt`)) {
      fs.writeFileSync(`${file_folder}/${prefix}.txt`, "");

      // verification message for user
      console.log(
        `"${path.join(file_folder, prefix + ".txt")}" file was created successfully!`,
      );
    }
  });
}

export default makeFiles;
