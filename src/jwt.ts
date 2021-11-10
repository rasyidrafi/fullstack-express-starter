import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret: string = process.env.JWT_SECRET! || "g4hj3k23j4h5f4g3hj";

export interface ParsedToken {
  userId: string;
  name: string;
}

export const generateToken = (userId: string, name: string) => {
  return jwt.sign({ userId, name }, secret, { expiresIn: "2h" });
};

export const verifyToken = (token: string) =>
  new Promise((resolve: (decodedToken: ParsedToken) => void, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      const decodedToken = decoded as ParsedToken;
      if (err) reject(err);
      else resolve(decodedToken);
    });
  });
