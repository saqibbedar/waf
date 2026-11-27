// import EventEmitter from "events";

// const emitter = new EventEmitter();

// const countEvents = {
//   signin: 0,
//   order: 0,
//   update: 0,
//   logout: 0,
// };

// emitter.on("signin", (name) => {
//   console.log(`${name} has logged in`);
//   countEvents.signin++;
// });

// emitter.on("order", (name, item) => {
//   console.log(`${name} has purchased ${item}`);
//   countEvents.order++;
// });

// emitter.on("update", (name, field) => {
//   console.log(`${name} has updated ${field}`);
//   countEvents.update++;
// });

// emitter.on("logout", (name) => {
//   console.log(`${name} has logged out..`);
//   countEvents.logout++;
// });

// emitter.on("summary", (obj) => {
//   console.log(obj);
// });

// emitter.emit("signin", "Zubair");
// emitter.emit("signin", "Talha");
// emitter.emit("order", "Zubair", "laptop");
// emitter.emit("update", "Talha", "name");
// emitter.emit("signin", "Karim");
// emitter.emit("logout", "Zubair");
// emitter.emit("logout", "Talha");

// emitter.emit("summary", countEvents);

import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import url from "url";

dotenv.config();
const server = http.createServer((request, response) => {
  const myURL = url.parse(request.url, true);
  if (request.url !== "/favicon.ico") console.log(myURL);

  const log = `\nNew Request: ${request.url}-${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
  // console.log(log);

  if (request.url === "/favicon.ico") {
    return response.end();
  }
  fs.appendFile("dataLog.txt", log, (err) => {
    if (err) console.log(err);
    fs.readFile("./home.html", "utf-8", (err, data) => {
      switch (myURL.pathname) {
        case "/":
          response.end(data);
          break;
        case "/about":
          const msg = myURL.query.message;
          console.log(msg);
          // const username = myURL.query.name;
          // const userID = myURL.query.id;
          response.end("About Page...");
          break;
        case "/contact":
          response.end("Contact Page...");
          break;
        default:
          response.end("Page Not Found.....");
      }
    });
  });
});

server.listen(process.env.PORT, "localhost", () => {
  console.log("The server has been initiated at port " + process.env.PORT);
});
