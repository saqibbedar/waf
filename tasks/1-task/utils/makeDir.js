import fs from "fs"
import path from "path";

// makeDir: create a dir in user desired location
// public_folder: location of public folder
// partx_folder: user has to specify the task part number replaceable by x placeholder
function makeDir(public_folder, partx_folder) {
    if(!fs.existsSync(path.join(public_folder, partx_folder))) {
        // Make directory
        fs.mkdir(`${public_folder}/${partx_folder}`, () =>

          // verification message for user   
          console.log(`"${path.join(public_folder, partx_folder)}" directory was created successfully!\n`),
        );
    }
}

export default makeDir;