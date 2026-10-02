import os from "os";
import path from "path";
import chalk from "chalk";

import { ROOT_DIR } from "../../config/index.js";

// Part 4: welcome message
console.log("\n---------- Part 4 ----------\n");

// Part 4.1.1 print uptime
console.log(`1. System uptime: ${chalk.bgYellow(os.uptime())}\n`);

// Par 4.1.2: display information of (current)*this.js file
const thisFilePath = path.join(ROOT_DIR, "/src/part4/index.js");
console.log("2. File info:\n", path.parse(thisFilePath), "\n");