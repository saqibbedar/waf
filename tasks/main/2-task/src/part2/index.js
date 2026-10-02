import http from "http";

import { read_file, write_file } from "../utils/index.js";
import {
  EMP_DATASET_FILE_PATH,
  NEW_EMP_DATASET_FILE_PATH,
} from "../../config/index.js";

// read data
let data = await read_file(EMP_DATASET_FILE_PATH);


if (!data || data.length <= 0) {
  throw new Error(
    `It looks like the given dataset is empty at ${EMP_DATASET_FILE_PATH}`,
  );
}

// =======================
// CURD Functions
// =======================

// 1. Delete class E ip_address employees from employees.json file
async function delete_class_e_emp() {
  data = data.filter((d, i) => {
    let ip_addr_array = d.ipAddress.split(".");
    let first_octet = parseInt(ip_addr_array[0], 10);

    // keep all data except class E
    return !(first_octet >= 240 && first_octet <= 255);
  });

  await write_file(EMP_DATASET_FILE_PATH, JSON.stringify(data, null, 2));
}

// 2. Update class D employees

// Description: Write a function that updates the company field to "XYZ Corp" for all employees with Class D IP addresses and saves the updated file.
async function update_class_d_emp() {
  data.forEach((d, i) => {
    const ip_addr_array = d.ipAddress.split(".");
    const first_octet = parseInt(ip_addr_array[0], 10);

    if (first_octet >= 224 && first_octet <= 239) {
      d["company"] = "XYZ Corp";
    }
  });

  await write_file(EMP_DATASET_FILE_PATH, JSON.stringify(data, null, 2));
}

// insert new employees data
async function insert_new_record() {

  const new_emp_data = await read_file(NEW_EMP_DATASET_FILE_PATH);

  // Map of id -> record
  const empMap = new Map(data.map(emp => [emp["id"], emp]));

  // Overwrite existing or insert new: O(1)
  for (const newEmp of new_emp_data) {
    empMap.set(newEmp["id"], newEmp);
  }

  data = Array.from(empMap.values());

  await write_file(EMP_DATASET_FILE_PATH, JSON.stringify(data, null, 2));
}

// retrieve class C employee data
function retrieve_class_c_emp() {
  let class_c_emp = data.filter((d, i) => {
    const ip_addr_array = d["ipAddress"].split(".");
    const first_octet = parseInt(ip_addr_array[0], 10);

    return first_octet >= 192 && first_octet <= 223;
  });

  return class_c_emp;
}


// ==============================
// Server
// ==============================

const PORT = 4000;

const server = http.createServer(async (req, res) => {
  try {
    switch(req.url) {
        case "/":
          res.end(`
                <h1>Welcome to Homepage</h1>
                <h3>Task 2: Part 2</h3>
                <p>Available Endpoints:</p>
                <ul>
                <li><a href="http://localhost:${PORT}/api/employees/delete/classE">/api/employees/delete/classE</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/update/classD">/api/employees/update/classD</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/insert/new">/api/employees/insert/new</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/get/classC">/api/employees/get/classC</a></li>
                </ul>
                `);
          break;
        case "/api/employees/delete/classE":
            await delete_class_e_emp();
            res.end(JSON.stringify({
                "IP Address Class": "E",
                "Total Records Now": data.length,
                "Operation Type": "DELETE",
                "Message": "IP Address Class E employees were deleted successfully!"
            }));
            break;
        case "/api/employees/update/classD":
            await update_class_d_emp();
            res.end(JSON.stringify({
                "IP Address Class": "D",
                "Total Records": data.length,
                "Operation Type": "UPDATE",
                "Message": "Class D employees company name changed successfully!",
                "Results": [...data]
            }))
            break;
        case "/api/employees/insert/new":
            await insert_new_record();
            res.end(JSON.stringify({
                "Total Records": data.length,
                "Operation Type": "INSERT",
                "Message": "New Employees were added successfully!",
                "Results": [...data]
            }))
            break;
        case "/api/employees/get/classC":
            const class_c_emp_data = retrieve_class_c_emp();
            res.end(JSON.stringify({
                "IP Address Class": "C",
                "Total Records": class_c_emp_data.length,
                "Operation Type": "GET",
                "Results": [...class_c_emp_data]
            }));
            break;
        default:
            res.end(`
                <h1>Page Not Found</h1>
                <p>Go back to <a href="/">Homepage</a></p>`);
            break;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});

server.listen(PORT, "localhost", () =>
  console.log(`Part two's server is running on http://localhost:${PORT}`),
);
