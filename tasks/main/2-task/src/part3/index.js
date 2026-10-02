import fs from "fs";
import http from "http";
import path from "path";

import { LOG_DIR_PATH } from "../../config/config.js";
import { write_file, append_file } from "../utils/index.js";

// =============================================================
// Prepare log file paths
// =============================================================
const logFilePath = path.join(LOG_DIR_PATH, "log.txt");
const productsFilePath = path.join(LOG_DIR_PATH, "products.txt");
const usersFilePath = path.join(LOG_DIR_PATH, "users.txt");
const booksFilePath = path.join(LOG_DIR_PATH, "books.txt");

// =============================================================
// Log class: An interface for different urls
// to save each url's object independently
// =============================================================
class Log {
  // log constructor
  constructor(
    serialNumber = 0,
    time = null,
    date = null,
    url = null,
    totalQueryParameters = 0,
  ) {
    this.serialNumber = serialNumber;
    this.time = time;
    this.date = date;
    this.url = url;
    this.totalQueryParameters = totalQueryParameters;
  }

  // methods
  // logFor: asking title for example: logFor="Homepage"
  output(logFor) {
    return `---------- ${logFor + " Log"} ----------\n\n- serialNumber: ${this.serialNumber}\n- time: ${this.time}\n- date: ${this.date}\n- url: ${this.url}\n- totalQueryParameters: ${this.totalQueryParameters}
        `;
  }
}

// =============================================================
// Logs objects: separate of concerns
// OnURLHit: save the object into /log/log.txt file
// =============================================================
let homepageLog = new Log();
let userLog = new Log();
let productLog = new Log();
let displayLog = new Log();
let bookLog = new Log();
let pageNotFoundLog = new Log();

// =============================================================
// Utility function: main function is to save extra steps
// Accepts: logObject (type: Log) and req.url
// =============================================================
async function generateLog(logObject, url) {
  // prepare log
  logObject.serialNumber++;
  logObject.time = new Date().toLocaleTimeString();
  logObject.date = new Date().toLocaleDateString();
  logObject.url = url;
  logObject.totalQueryParameters = url.includes("?")
    ? url.split("?")[1].split("&").length
    : 0;
  // OR
  // log.totalQueryParameters = new URL(req.url, 'http://localhost').searchParams.size;
}

// =============================================================
// Make three text files with no data currently
// 1. products.txt
// 2. users.txt
// 3. books.txt
// =============================================================
async function generateTextFiles() {
  const fileExist =
    fs.existsSync(productsFilePath) ||
    fs.existsSync(usersFilePath) ||
    fs.existsSync(booksFilePath);

  if (!fileExist) {
    await write_file(usersFilePath, "");
    await write_file(productsFilePath, "");
    await write_file(booksFilePath, "");
  }
}

await generateTextFiles();

// =============================================================
// http server and api endpoints
// =============================================================

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  // prepare pathname and queryParams
  const parsedURL = new URL(req.url, "http://localhost");
  //   console.log(parsedURL);
  const pathname = parsedURL.pathname; // get path /users, /, /products etc.
  //   console.log(pathname);
  const queryParams = parsedURL.searchParams; // key value pairs {key:value}
  //   console.log(queryParams);

  //   a variable used inside query routes to formate the output before saving to log files.
  let formatted_log = "";

  switch (pathname) {
    case "/":
      // generate Homepage logObject
      generateLog(homepageLog, req.url);

      await append_file(logFilePath, `${homepageLog.output("Homepage")}\n`);

      res.end(`
                <h1>Welcome to Homepage</h1>
                <h3>Task 2: Part 3</h3>
                <p>Available Endpoints:</p>
                <ul>
                <li><a href="http://localhost:${PORT}/">Homepage</a></li>
                <li><a href="http://localhost:${PORT}/users">Users</a></li>
                <li><a href="http://localhost:${PORT}/products">Products</a></li>
                <li><a href="http://localhost:${PORT}/display">Display</a></li>
                <li><a href="http://localhost:${PORT}/books">Books</a></li>
                </ul>
                `);
      break;
    case "/users":
      // Part3.1: generate productPage log & append data to log.txt file
      generateLog(userLog, req.url);
      await append_file(logFilePath, `${userLog.output("User")}\n`);

      // Part3.2: get id, user name, age, city, and university & append to users.txt file
      // query: /users?id=24&name=Abdullah&age=60&city=Islamabad&uni=QAU

      const userId = queryParams.get("id");
      const userName = queryParams.get("name");
      const userAge = queryParams.get("age");
      const userCity = queryParams.get("city");
      const userUni = queryParams.get("uni");

      formatted_log = `----------- User Log ----------\n\n- id: ${userId}\n- name: ${userName}\n- age: ${userAge}\n- city: ${userCity}\n- university: ${userUni}`;

      //   save log
      await append_file(usersFilePath, `${formatted_log}\n\n`);
      res.end("Logs were recorded in dedicated files, successfully!");
      break;

    case "/products":
      // generate productPage log & append data to log.txt file
      generateLog(productLog, req.url);
      await append_file(logFilePath, `${productLog.output("Product")}\n`);

      // Part3.2: get id, product title, and product price from req.query and append to products.txt file
      // query: /products?id=89&title=Samsung&price=75K
      const productId = queryParams.get("id");
      const productTitle = queryParams.get("title");
      const productPrice = queryParams.get("price");

      // format output for log
      formatted_log = `----------- Product Log ----------\n\n- id: ${productId}\n- title: ${productTitle}\n- price: ${productPrice}`;

      //   save log
      await append_file(productsFilePath, `${formatted_log}\n\n`);
      res.end("Logs were recorded in dedicated files, successfully!");
      break;

    case "/display":
      // generate displayPage log
      generateLog(displayLog, req.url);
      await append_file(logFilePath, `${displayLog.output("Display")}\n`);
      res.end("Log was recorded successfully!");
      break;

    case "/books":
      // Part3.1: generate productPage log & append data to log.txt file
      generateLog(bookLog, req.url);
      await append_file(logFilePath, `${bookLog.output("Books")}\n`);

      // Part3.2: get id, book title, edition, year of publication, and press name & append to books.txt file
      // query: books?id=19&title=AlgorithmDesignAndApplications&edition=3&2019&press=Wiley
      const bookId = queryParams.get("id");
      const bookTitle = queryParams.get("title");
      const bookEdition = queryParams.get("edition");
      const bookPress = queryParams.get("press");

      formatted_log = `----------- Book Log ----------\n\n- id: ${bookId}\n- title: ${bookTitle}\n- edition: ${bookEdition}\n- press: ${bookPress}`;
      await append_file(booksFilePath, `${formatted_log}\n\n`);
      res.end("Logs were recorded in dedicated files, successfully!");

      break;

    default:
      // generate userPage log
      generateLog(pageNotFoundLog, req.url);
      await append_file(
        logFilePath,
        `${pageNotFoundLog.output("Page Not Found")}\n`,
      );
      res.end(`
                <h1>Page Not Found</h1>
                <p>Go back to <a href="/">Homepage</a></p>`);
      break;
  }
});

server.listen(PORT, "localhost", () =>
  console.log(`Part3 server is running at http://localhost:${PORT}`),
);
