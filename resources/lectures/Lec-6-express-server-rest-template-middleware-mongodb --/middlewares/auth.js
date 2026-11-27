import dotenv from "dotenv";

dotenv.config();
export const auth = (req, res, next) => {
  console.log(req);
  const token = req.headers.authorization;
  console.log(token);
  if (token === `${process.env.AUTH_TOKEN}`) {
    next();
  } else {
    res.status(401).json({
      status: "fail",
      msg: "unauthorised",
    });
  }
};
