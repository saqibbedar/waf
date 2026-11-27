export function MW1(req, res, next) {
  if (req.url === "/favicon.ico") {
    return next();
  }
  req.name = "XYZ";
  console.log("This is the first middleware...");
  next();
}

export function MW2(req, res, next) {
  if (req.url === "/favicon.ico") {
    return next();
  }
  console.log("This is the second middleware...");
  next();
}

export function MW3(req, res, next) {
  if (req.url === "/favicon.ico") {
    return next();
  }
  console.log("This is the third middleware...");
  next();
}
