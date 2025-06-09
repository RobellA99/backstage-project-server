import jwt from "jsonwebtoken";

const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expireIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

export default generateToken;
