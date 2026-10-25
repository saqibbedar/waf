// Authorization Middleware: user roles, such as admin and viewer, to restrict operations
//  Admin: Can view, add, edit, update, and remove records.
//  Viewer: Can only view records.

export default function (req, res, next) {
    // get custom header X-User-Role and append to req and let endpoint handlers to handle logic based on userRole
    const userRole = req.headers["x-user-role"];

    req.userRole = userRole === "admin" ? "admin" : "viewer";

    next();
};