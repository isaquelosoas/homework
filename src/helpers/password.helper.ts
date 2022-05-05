import { AES, enc } from 'crypto-js';

export class PasswordHelper {
  public static hashPassword(password: string): string {
    return AES.encrypt(password, process.env.CRYPTO_SECRET_KEY).toString();
  }

  public static comparePassword(password: string, hash: string): boolean {
    const bytes = AES.decrypt(hash, process.env.CRYPTO_SECRET_KEY);
    const plaintext = bytes.toString(enc.Utf8);
    return password === plaintext;
  }
}
