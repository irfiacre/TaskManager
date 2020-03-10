import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export default class Authorisation {
  static async access(req, res, next) {
     
    try {
      const token = req.headers.authorization;

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;

      next();
    } catch (error) {

      return res.status(401).json({
        "status": 401,
        "message": "Unauthorised Access: You have to login to Proceed"
      });
    }
  }
}