import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

class TokenUtils {
  generateToken(userId: string) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string) {
    return jwt.verify(token, secretKey);
  }
}

export default new TokenUtils();
