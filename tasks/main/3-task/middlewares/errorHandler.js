// 404 Handler for invalid routes (placed after all routes in app.js)
export function notFound(req, res, next) {
  res.status(404).render("error");
}

// Global Error Handler (4 arguments)
export function errorHandler(err, req, res, next) {
  console.error("Server Error:", err.message);

  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred.";

  if (req.path.startsWith("/api/")) {
    return res.status(status).json({ error: message });
  }

  res.status(status).render("error");
}
