import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import users from "./data.json" with { type: "json" };

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/home", (req, res) => {
  res.sendFile(`${publicPath}/home.html`);
});

app.get("/about", (req, res) => {
  res.sendFile(`${publicPath}/about.html`);
});

app.get("/contact", (req, res) => {
  res.sendFile(`${publicPath}/contact.html`);
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
app.get("/{*splat}", (req, res) => {
  res.sendFile(`${publicPath}/error.html`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated at port ${process.env.PORT} `);
});
