import path from "path";

// utils
import { read_file, append_file, makeDir, makeFiles } from "../utils/index.js";

// file prefix
const file_prefix = ["com", "gov", "edu", "uk"];

// desired folder & file location
const public_folder = path.resolve("./public");
const part1_folder = "part1_files";

// create folder & files
makeDir(public_folder, part1_folder);
makeFiles(path.join(public_folder, part1_folder), file_prefix);

// read parsed data
const data = await read_file("./public/data.json");

// Append data into created files
const append_data = async () => {
  try {
    // sanity check for async read_file function: make sure data has read fully.
    if (data.length <= 0) {
      throw new Error(
        "Error: It looks like data.json file does not exit on your system, please data.json in /public to proceed!",
      );
    }

    // counters: metadata
    let w, x, y, z;
    w = x = y = z = 0;

    for (let d of data) {
      // verify object
      // console.log(d)

      // split array
      const email_array = d.email.split(".");

      if (email_array.includes("com")) {
        await append_file(
          path.join(public_folder, part1_folder, file_prefix[0] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        w++;
      } else if (email_array.includes("gov")) {
        await append_file(
          path.join(public_folder, part1_folder, file_prefix[1] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        x++;
      } else if (email_array.includes("edu")) {
        await append_file(
          path.join(public_folder, part1_folder, file_prefix[2] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        y++;
      } else if (email_array.includes("uk")) {
        await append_file(
          path.join(public_folder, part1_folder, file_prefix[3] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        z++;
      }
    }

    // stats
    console.log(`---------------------------------------------------`);
    console.log(`File Name  |  Records Entered      |  File Location`);
    console.log(`---------------------------------------------------`);
    console.log(
      `${file_prefix[0]}.txt    |  ${w}                  |  ${path.join(public_folder, part1_folder, file_prefix[0] + ".txt")}`,
    );
    console.log(
      `${file_prefix[1]}.txt    |  ${x}                   |  ${path.join(public_folder, part1_folder, file_prefix[1] + ".txt")}`,
    );
    console.log(
      `${file_prefix[2]}.txt    |  ${y}                   |  ${path.join(public_folder, part1_folder, file_prefix[2] + ".txt")}`,
    );
    console.log(
      `${file_prefix[3]}.txt     |  ${z}                   |  ${path.join(public_folder, part1_folder, file_prefix[3] + ".txt")}`,
    );
  } catch (error) {
    console.error(error);
  } finally {
    console.log("\n\nAll operations finished!");
  }
};

append_data();
