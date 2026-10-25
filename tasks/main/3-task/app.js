import http from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import {
  logger,
  auth,
  validate,
  rateLimiter,
  notFound,
  errorHandler,
} from "./middlewares/index.js";

// read json data
import rawUsers from "./dataset/data.json" with { type: "json" };
let users = [...rawUsers];

const app = express();

// path config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// builtin middlewares
app.use(express.json());
app.use(express.urlencoded());

// views config
app.set("view engine", "ejs");

// custom middlewares
app.use(logger);
app.use(rateLimiter);

// endpoints
// test api
app.get("/api/test", (req, res) => {
  res.status(200).json("Server is healthy...");
});

// homepage: get all users
app.get("/", (req, res) => {
  res.render("home", { users });
});
// render form for add user
app.get("/api/user", (req, res) => {
  res.render("createUserForm");
});

// add new user
app.post("/api/user", auth, validate, (req, res) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied, only admin can add a user." });
  }

  const { username, name, email } = req.body;

  // Find user by username
  const userIndex = users.findIndex((u) => u.username === username);

  // Check if the new email is already taken by another user (excluding this user)
  const emailExists = users.some(
    (u, idx) => u.email === email && idx !== userIndex,
  );
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, error: "Email already in use by another user." });
  }

  // Update the user in-place in the array
  users[userIndex] = { username, name, email };

  // Save updated array to file
  const dataPath = path.join(__dirname, "dataset/data.json");
  fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf-8", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write to json file" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User added successfully" });
  });
});

// update user
app.put("/api/user", auth, validate, (req, res) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied, only admin can update a user." });
  }

  const { username, name, email } = req.body;

  // Find user by username
  const userIndex = users.findIndex((u) => u.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found to update." });
  }

  // Check if the new email is already taken by another user (excluding this user)
  const emailExists = users.some(
    (u, idx) => u.email === email && idx !== userIndex,
  );
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, error: "Email already in use by another user." });
  }

  // Update the user in-place in the array
  users[userIndex] = { username, name, email };

  // Save updated array to file
  const dataPath = path.join(__dirname, "dataset/data.json");
  fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf-8", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write to json file" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  });
});

// remove user
app.delete("/api/user", auth, (req, res) => {
  if (req.userRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied, only admin can delete a user." });
  }

  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: "Username is required for delete operation" });
  }

  const userIndex = users.findIndex((user) => user.username === username);
  // out of index
  if (userIndex === -1) {
    return res.status(404).json({ error: "User does not exist" });
  }

  // remove user from in-memroy array
  users.splice(userIndex, 1);

  const dataPath = path.join(__dirname, "dataset/data.json");
  fs.writeFile(dataPath, JSON.stringify(users, null, 2), "utf-8", (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write to json file" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  });
});

app.use(notFound);
app.use(errorHandler);

// http server
const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`),
);
