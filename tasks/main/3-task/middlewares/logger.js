import fs from "fs";

export default function logger(req, res, next) {
  const start = Date.now();

  // Calculate processing time once response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] Method: ${req.method} | URL: ${req.originalUrl} | Duration: ${duration}ms | Status: ${res.statusCode}\n`;

    fs.appendFile("./log.txt", logEntry, "utf-8", (err) => {
      if (err) console.error("Failed to write to log.txt:", err.message);
    });
  });

  next();
}
