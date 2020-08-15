import { compare, hash } from 'bcrypt';

interface IPasswordService {
  hashPassword: (plainTextPassword: string) => Promise<string>
  doesPasswordMatch: (plainTextPassword: string, hashedPassword: string) => Promise<boolean>
}

export class PasswordService implements IPasswordService {
  private readonly salt: string;

  constructor(salt: string = process.env.BCRYPT_SALT) {
    this.salt = salt;
  }

  async hashPassword(plainTextPassword: string): Promise<string> {
    return hash(plainTextPassword, this.salt);
  }

  async doesPasswordMatch(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(plainTextPassword, hashedPassword);
  }
}
