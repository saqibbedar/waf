import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.send("Hello from server side...");
// });

// app.get("/about", (req, res) => {
//   const data = [
//     { name: "ALI", id: 1 },
//     { name: "XYZ", id: 2 },
//     { name: "ABC", id: 34 },
//   ];
//   res.send(data);
// });

// app.get("/contact", (req, res) => {
//   //   console.log(req);
//   res.send(`Contact Page...${req.query.name}`);
// });

// // app.post("/contact", (res, req) => {});

// app.get("/{*splat}", (req, res) => {
//   res.send("Page not found");
// });

// app.get("/home", (req, res) => {
//   res.sendFile(`${publicPath}/home.html`);
// });

app.get("", (req, res) => {
  res.sendFile(`${publicPath}/home.html`);
});

import users from "./data.json" with { type: "json" };

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/users", (req, res) => {
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
      return `<tr>
    <td>${user.id}</td>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      <td>${user.ip_address}</td>
    </tr>`;
    })
    .join("")}
    
  </tbody>
</table>
  `;
  res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({
      status: "no user found",
    });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

app.use(express.json());
import fs from "fs";

app.post("/api/user", (req, res) => {
  const newUser = req.body;

  users.push(newUser);
  fs.writeFile("./data.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File written successfully");
  });

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.json({
      status: "error",
      message: "User Not Found..",
    });
  }

  Object.assign(user, req.body);
  fs.writeFile("./data.json", JSON.stringify(users), (err) => {
    if (!err) {
      console.log("File Written Successfully...");
    } else {
      console.log(err);
    }
  });
  res.json({
    status: "success",
    data: user,
  });
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(201).json({
      status: "error",
      msg: "User Not Found...",
    });
  } else {
    Object.assign(user, req.body);
    fs.writeFile("./data.json", JSON.stringify(users), (err) => {
      if (!err) {
        console.log("File Written Successfully...");
      } else {
        console.log(err);
      }
    });
    res.status(201).json({
      status: "success",
      data: users,
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  // const user = users.find((user)=> user.id === id)

  if (index === -1) {
    res.status(401).json({
      status: "error",
      msg: "User Not Found....",
    });
  } else {
    const deletedUser = users.splice(index, 1);

    fs.writeFile("./data.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      status: "success",
      data: deletedUser[0],
    });
  }
});

app.listen(8000, () => {
  console.log("The server has been initiated at port 8000");
});

// import express from "express";
// import http from "http";
// import path from "path";
// import { fileURLToPath } from "url";
// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// // console.log(__filename);
// const __dirname = path.dirname(__filename);
// const publicPath = path.join(__dirname, "public");
// console.log(publicPath);

// app.use(express.static(publicPath));
// app.get("/home", (req, res) => {
//   res.sendFile(path.join(publicPath, "home.html"));
// });

// app.get("/{*splat}", (req, res) => {
//   res.sendFile(path.join(publicPath, "Error.html"));
// });
// // app.get("/", (req, res) => {
// //   res.sendFile(path.join(publicPath, "home.html"));
// // });

// // app.get("/about", (req, res) => {
// //   res.send(`hey ${req.query.name}`);
// // });

// // app.get("/contact", (request, response) => {
// //   const data = [
// //     { name: "Ali", id: 100 },
// //     { name: "Umer", id: 101 },
// //     { name: "Umair", id: 103 },
// //   ];
// //   response.send(data);
// // });

// // app.get("/{*splat}", (req, res) => {
// //   res.send("Page Not Found...");
// // });

// app.listen(8000, () => {
//   console.log("Server initiated at port 8000");
// });
