import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import mongoose from "mongoose";

// import users from "./data.json" with { type: "json" };
// import { MW1, MW2, MW3 } from "./middlewares/check.js";
import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((err) => {
    console.log(err);
  });

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

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ipAdd: {
    type: String,
    required: true,
  },
});

const USER = mongoose.model("user", userSchema);

app.get("/submit", (req, res) => {
  res.render("form");
});

app.post("/submit", async (req, res) => {
  const obj = req.body;
  const user = await USER.create(obj);
  res.json({
    status: "success",
    data: user,
  });
  // users.push({ id: users.length + 6, ...obj });

  // fs.writeFile("./data.json", JSON.stringify(users), (err) => {
  //   if (err) {
  //     res.json({
  //       status: "fail",
  //       msg: "error in file writing..",
  //     });
  //   } else {
  //     res.json({
  //       status: "success",
  //       data: users,
  //     });
  //   }
  // });
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

app.get("/users", auth, async (req, res) => {
  const allUsers = await USER.find({});
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
  ${allUsers
    .map((user) => {
      return `
    <tr>
    <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.ipAdd}</td>
    </tr>`;
    })
    .join("")}
    
  </tbody>
</table>
    `;

  res.send(html);
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await USER.find({ lastName: "Shephard" });
    if (!users) {
      res.json({
        status: "fail",
        msg: "No user found..",
      });
    } else {
      res.json({
        status: "success",
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await USER.findById(id);
    if (!user) {
      res.json({
        status: "fail",
        msg: "User not found...",
      });
    } else {
      res.json({
        status: "success",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
  }

  // const id = Number(req.params.id);

  // const user = users.find((user) => user.id === id);

  // res.status(201).json({
  //   status: "success",
  //   data: user,
  // });
});

app.post("/api/users", async (req, res) => {
  const arrObj = [
    {
      firstName: "Bashir",
      lastName: "Ahmad",
      email: "wwye0@mayoclinic.com",
      gender: "Male",
      ipAdd: "162.231.226.81",
    },
    {
      firstName: "Claudine",
      lastName: "Shephard",
      email: "cshephard1@fotki.com",
      gender: "Female",
      ipAdd: "252.83.66.25",
    },
    {
      firstName: "Cesare",
      lastName: "Wroe",
      email: "cwroe2@addthis.com",
      gender: "Male",
      ipAdd: "115.227.218.237",
    },
  ];
  try {
    const user = await USER.insertMany(arrObj);

    if (!user) {
      res.json({
        status: "fail",
        msg: "No user found...",
      });
    } else {
      res.json({
        status: "success",
        msg: "SUCCESSFUL POST ....",
      });
    }
  } catch (error) {
    console.log(error);
  }

  // const obj = req.body;
  // console.log(obj);
  // users.push({ id: users.length + 1, ...obj });

  // fs.writeFile("./data.json", JSON.stringify(users), (err) => {
  //   if (err) {
  //     console.log(err);
  //     res.json({
  //       status: "failure",
  //       msg: "error....",
  //     });
  //   } else {
  //     res.json({
  //       status: "active",
  //       data: users,
  //     });
  //   }
  // });
});

app.patch("/api/users/:firstName", async (req, res) => {
  try {
    const first_name = req.params.firstName;
    if (!first_name) {
      res.json({
        status: "fail",
        msg: "Not found..",
      });
    } else {
      const user = await USER.updateMany(
        { firstName: first_name },
        { $set: { ipAdd: "192.168.1.1" } },
      );
      res.json({
        status: "success",
        msg: "PATCH SUCCESSFUL",
      });
    }
  } catch (error) {
    console.log(error);
  }

  // const id = Number(req.params.id);

  // const user = users.find((user) => {
  //   return user.id === id;
  // });

  // if (!user) {
  //   res.json({
  //     status: "fail",
  //     msg: "User Not Found....",
  //   });
  // } else {
  //   Object.assign(user, req.body);
  //   fs.writeFile("./data.json", JSON.stringify(users), (err) => {
  //     res.json({
  //       status: "success",
  //       data: user,
  //     });
  //   });
  // }
});

app.put("/api/users/:lastName", async (req, res) => {
  try {
    const last_name = req.params.lastName;

    if (!last_name) {
      res.json({
        status: "fail",
        msg: "No ID found...",
      });
    } else {
      await USER.updateMany(
        { lastName: last_name },
        {
          $set: {
            firstName: "Cesare",
            lastName: "Wroe",
            email: "cwroe2@addthis.com",
            gender: "Male",
            ipAdd: "115.227.218.237",
          },
        },
      );

      res.json({
        status: "success",
        msg: "PUT METHOD SUCCESSFUL",
      });
    }
  } catch (error) {
    console.log(error);
  }

  // const userID = Number(req.params.id);

  // const userObj = users.find((user) => {
  //   return user.id === userID;
  // });

  // if (!userObj) {
  //   res.json({
  //     status: "failure",
  //     message: "User not found...",
  //   });
  // } else {
  //   Object.assign(userObj, req.body);
  //   fs.writeFile("./data.json", JSON.stringify(users), (err) => {
  //     if (err) {
  //       res.json({
  //         status: "failure",
  //         msg: "error writing file....",
  //       });
  //     } else {
  //       res.json({
  //         status: "success",
  //         message: userObj,
  //       });
  //     }
  //   });
  // }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      res.json({
        status: "fail",
        msg: "No User Found....",
      });
    } else {
      await USER.findByIdAndDelete(userID);
      res.json({
        status: "success",
        msg: "DELETE SUCCESSFUL",
      });
    }
  } catch (error) {
    console.log(error);
  }

  // const id = Number(req.params.id);

  // const index = users.findIndex((user) => {
  //   return user.id === id;
  // });

  // if (index === -1) {
  //   res.json({
  //     status: "failure",
  //     msg: "No user found ....",
  //   });
  // } else {
  //   const deletedUser = users.splice(index, 5);

  //   fs.writeFile("./data.json", JSON.stringify(users), (err) => {
  //     if (err) {
  //       res.json({
  //         status: "failure",
  //         msg: "error in file writing....",
  //       });
  //     } else {
  //       res.json({
  //         status: "success",
  //         data: deletedUser,
  //       });
  //     }
  //   });
  // }
});

app.get("/{*splat}", (req, res) => {
  res.render("error");
  // res.sendFile(`${publicPath}/error.html`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT} `);
});
