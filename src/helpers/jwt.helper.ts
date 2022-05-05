import { sign, verify, decode } from 'jsonwebtoken';

export class JwtHelper {
  public static generateToken(payload: any): string {
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  public static verifyToken(token: string): any {
    return verify(token, process.env.JWT_SECRET);
  }

  public static decodeToken(token: string): any {
    return decode(token);
  }
}
