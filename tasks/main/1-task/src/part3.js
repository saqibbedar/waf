import path from "path";

// utils
import { read_file, append_file, makeDir, makeFiles } from "../utils/index.js";

// file prefix
const file_prefix = [
  "IP_Class_A",
  "IP_Class_B",
  "IP_Class_C",
  "IP_Class_D",
  "IP_Class_E",
];

// desired folder & file location
const public_folder = path.resolve("./public");
const part3_folder = "part3_files";

// create folder & files
makeDir(public_folder, part3_folder);
makeFiles(path.join(public_folder, part3_folder), file_prefix);

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
    let v, w, x, y, z;
    v = w = x = y = z = 0;

    for (let d of data) {
      // verify object
      // console.log(d)

      // split array
      const ip_addr_array = d.ip_addr.split(".");
      const first_octet = parseInt(ip_addr_array[0], 10);

      /**
       *   Class        |        range
       * --------------------------------
       *   A            |        1 – 126 (Note: 0 and 127 are reserved)
       *   B            |        128 – 191
       *   C            |        192 – 223
       *   D            |        224 – 239
       *   E            |        240 – 255
       */

      if (first_octet >= 1 && first_octet <= 126) {
        await append_file(
          path.join(public_folder, part3_folder, file_prefix[0] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        v++;
      } else if (first_octet >= 128 && first_octet <= 191) {
        await append_file(
          path.join(public_folder, part3_folder, file_prefix[1] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        w++;
      } else if (first_octet >= 192 && first_octet <= 223) {
        await append_file(
          path.join(public_folder, part3_folder, file_prefix[2] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        x++;
      } else if (first_octet >= 224 && first_octet <= 239) {
        await append_file(
          path.join(public_folder, part3_folder, file_prefix[3] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        y++;
      } else if (first_octet >= 240 && first_octet <= 255) {
        await append_file(
          path.join(public_folder, part3_folder, file_prefix[4] + ".txt"),
          `${JSON.stringify(d)}\n`,
        );
        z++;
      }
    }

    // stats
    console.log("-----------------------------------------------------------");
    console.log(`File Name         |  Records Entered       |  File Location`);
    console.log("-----------------------------------------------------------");
    console.log(
      `${file_prefix[0]}.txt    |  ${v}                   |  ${path.join(public_folder, part3_folder, file_prefix[0] + ".txt")}`,
    );
    console.log(
      `${file_prefix[1]}.txt    |  ${w}                   |  ${path.join(public_folder, part3_folder, file_prefix[1] + ".txt")}`,
    );
    console.log(
      `${file_prefix[2]}.txt    |  ${x}                   |  ${path.join(public_folder, part3_folder, file_prefix[2] + ".txt")}`,
    );
    console.log(
      `${file_prefix[3]}.txt    |  ${y}                    |  ${path.join(public_folder, part3_folder, file_prefix[3] + ".txt")}`,
    );
    console.log(
      `${file_prefix[4]}.txt    |  ${z}                    |  ${path.join(public_folder, part3_folder, file_prefix[4] + ".txt")}`,
    );
  } catch (error) {
    console.error(error);
  } finally {
    console.log("\n\nAll operations finished!");
  }
};

append_data();
