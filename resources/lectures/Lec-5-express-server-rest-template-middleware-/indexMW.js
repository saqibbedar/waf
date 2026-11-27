import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import users from "./data.json" with { type: "json" };
// import { MW1, MW2, MW3 } from "./middlewares/check.js";
import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

// app.use(MW1);
// app.use(MW2);
// app.use(MW3);

app.use(logger);

app.get("/submit", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const obj = req.body;

  users.push({ id: users.length + 6, ...obj });

  fs.writeFile("./data.json", JSON.stringify(users), (err) => {
    if (err) {
      res.json({
        status: "fail",
        msg: "error in file writing..",
      });
    } else {
      res.json({
        status: "success",
        data: users,
      });
    }
  });
});

app.get("/home", (req, res) => {
  res.render("home", { users });
  // res.sendFile(`${publicPath}/home.html`);
});

app.get("/about", (req, res) => {
  res.render("about", { name: req.name });
  // res.sendFile(`${publicPath}/about.html`);
});

app.get("/contact", (req, res) => {
  res.render("contact");
  // res.sendFile(`${publicPath}/contact.html`);
});

app.get("/users", auth, (req, res) => {
  const html = `
    
    <table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Gender</th>
      <th>IP Address</th>
    </tr>
  </thead>

  <tbody>
  ${users
    .map((user) => {
      return `
    <tr>
    <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.ip_address}</td>
    </tr>`;
    })
    .join("")}
    
  </tbody>
</table>
    `;

  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.status(201).json({
    status: "success",
    data: users,
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  res.status(201).json({
    status: "success",
    data: user,
  });
});

app.post("/api/users", (req, res) => {
  const obj = req.body;
  console.log(obj);
  users.push({ id: users.length + 1, ...obj });

  fs.writeFile("./data.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
      res.json({
        status: "failure",
        msg: "error....",
      });
    } else {
      res.json({
        status: "active",
        data: users,
      });
    }
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => {
    return user.id === id;
  });

  if (!user) {
    res.json({
      status: "fail",
      msg: "User Not Found....",
    });
  } else {
    Object.assign(user, req.body);
    fs.writeFile("./data.json", JSON.stringify(users), (err) => {
      res.json({
        status: "success",
        data: user,
      });
    });
  }
});

app.put("/api/users/:id", (req, res) => {
  const userID = Number(req.params.id);

  const userObj = users.find((user) => {
    return user.id === userID;
  });

  if (!userObj) {
    res.json({
      status: "failure",
      message: "User not found...",
    });
  } else {
    Object.assign(userObj, req.body);
    fs.writeFile("./data.json", JSON.stringify(users), (err) => {
      if (err) {
        res.json({
          status: "failure",
          msg: "error writing file....",
        });
      } else {
        res.json({
          status: "success",
          message: userObj,
        });
      }
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((user) => {
    return user.id === id;
  });

  if (index === -1) {
    res.json({
      status: "failure",
      msg: "No user found ....",
    });
  } else {
    const deletedUser = users.splice(index, 5);

    fs.writeFile("./data.json", JSON.stringify(users), (err) => {
      if (err) {
        res.json({
          status: "failure",
          msg: "error in file writing....",
        });
      } else {
        res.json({
          status: "success",
          data: deletedUser,
        });
      }
    });
  }
});

app.get("/{*splat}", (req, res) => {
  res.render("error");
  // res.sendFile(`${publicPath}/error.html`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT} `);
});
