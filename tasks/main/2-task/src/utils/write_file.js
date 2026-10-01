// write_file: a generic function to write data to any non-binary file at given path

import fs from "fs";

const write_file = async (file_path, data) => {
    try {
        await fs.promises.writeFile(file_path, data, "utf-8")
    } catch (error) {
        console.error(error);
    }
};

export default write_file;