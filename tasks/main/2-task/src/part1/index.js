import { read_file } from "../utils/index.js";
import { EMP_DATASET_FILE_PATH } from "../../config/index.js";

import http from "http";

const data = await read_file(EMP_DATASET_FILE_PATH);

// console.log(data)

if (!data || data.length <= 0) {
  throw new Error(
    `It looks like the given dataset is empty at ${dataset_path}`,
  );
}

const ip_addr_data = {
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

// perform the task
data.forEach(async (d) => {
  let ip_addr_array = d.ipAddress.split(".");
  let first_octet = parseInt(ip_addr_array[0], 10);

  if (first_octet >= 1 && first_octet <= 126) {
    ip_addr_data["A"].push(d);
  } else if (first_octet >= 128 && first_octet <= 191) {
    ip_addr_data["B"].push(d);
  } else if (first_octet >= 192 && first_octet <= 223) {
    ip_addr_data["C"].push(d);
  } else if (first_octet >= 224 && first_octet <= 239) {
    ip_addr_data["D"].push(d);
  } else if (first_octet >= 240 && first_octet <= 255) {
    ip_addr_data["E"].push(d);
  }
});

const PORT = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.end(`
                <h1>Welcome to Homepage</h1>
                <h3>Task 2: Part 1</h3>
                <p>Available Endpoints:</p>
                <ul>
                <li><a href="http://localhost:${PORT}/api/employees/classA">/api/employees/classA</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/classB">/api/employees/classB</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/classC">/api/employees/classC</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/classD">/api/employees/classD</a></li>
                <li><a href="http://localhost:${PORT}/api/employees/classE">/api/employees/classE</a></li>
                </ul>
                `);
      break;
    case "/api/employees/classA":
      res.end(
        JSON.stringify({
          IP_Address_Class: "A",
          total_records: ip_addr_data["A"].length,
          results: [...ip_addr_data["A"]],
        }),
      );
      break;
    case "/api/employees/classB":
      res.end(
        JSON.stringify({
          IP_Address_Class: "B",
          total_records: ip_addr_data["B"].length,
          results: [...ip_addr_data["B"]],
        }),
      );
      break;
    case "/api/employees/classC":
      res.end(
        JSON.stringify({
          IP_Address_Class: "C",
          total_records: ip_addr_data["C"].length,
          results: [...ip_addr_data["C"]],
        }),
      );
      break;
    case "/api/employees/classD":
      res.end(
        JSON.stringify({
          IP_Address_Class: "D",
          total_records: ip_addr_data["D"].length,
          results: [...ip_addr_data["D"]],
        }),
      );
      break;
    case "/api/employees/classE":
      res.end(
        JSON.stringify({
          IP_Address_Class: "E",
          total_records: ip_addr_data["E"].length,
          results: [...ip_addr_data["E"]],
        }),
      );
      break;
    default:
      res.end(`
                <h1>Page Not Found</h1>
                <p>Go back to <a href="/">Homepage</a></p>`);
      break;
  }
});

server.listen(PORT, "localhost", () =>
  console.log(`Part1 server is running at http://localhost:${PORT}`),
);
