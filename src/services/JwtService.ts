import { IToken, IUser } from '../types/types';
import { sign, verify } from 'jsonwebtoken';

interface IJwtService {
  makeToken: (user: IUser) => string
  verifyToken: (token: string) => IToken
}

export class JwtService implements IJwtService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  static JWT_EXPIRATION_IN_SECONDS = 24 * 60 * 60;  // 1 day

  constructor(privateKey: string, publicKey: string) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  makeToken(user: IUser): string {
    return sign(user, this.privateKey, {
      algorithm: 'RS256',
      expiresIn: JwtService.JWT_EXPIRATION_IN_SECONDS
    });
  }

  verifyToken(token: string): IToken {
    const verified = verify(token, this.publicKey);
    // @ts-ignore
    const { displayName, email, iat, id, exp }: IToken = verified;
    return {
      id,
      displayName,
      email,
      iat,
      exp
    };
  }
}
