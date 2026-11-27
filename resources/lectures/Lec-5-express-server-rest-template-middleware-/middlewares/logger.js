import fs from "fs";

export const logger = (req, res, next) => {
  const log = `${req.url} - ${new Date().getDate()} - ${new Date().getMonth() + 1} - ${new Date().getFullYear()}\n`;

  fs.appendFile("./log.txt", log, "utf-8", (err) => {
    if (!err) {
      next();
    }
  });
};
