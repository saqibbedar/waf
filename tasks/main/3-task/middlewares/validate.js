import validator from "validator";

export default function validate(req, res, next) {
  const { username, name, email } = req.body;

  // 1. Required fields check
  if (!username || !name || !email) {
    return res
      .status(400)
      .json({ error: "All fields (username, name, email) are required." });
  }

  const cleanUsername = String(username).trim();
  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();

  // 2. Validate username (not all numbers, between 6 and 10 chars)
  if (validator.isNumeric(cleanUsername)) {
    return res
      .status(400)
      .json({ error: "Username cannot contain only numbers." });
  }
  if (cleanUsername.length < 6 || cleanUsername.length > 10) {
    return res
      .status(400)
      .json({ error: "Username must be between 6 and 10 characters." });
  }

  // 3. Validate name (length between 6 and 50 chars)
  if (cleanName.length < 6 || cleanName.length > 50) {
    return res
      .status(400)
      .json({ error: "Name must be between 6 and 50 characters." });
  }

  // 4. Validate email
  if (!validator.isEmail(cleanEmail)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  next();
}
