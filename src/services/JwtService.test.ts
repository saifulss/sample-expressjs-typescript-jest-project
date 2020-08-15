import { JwtService } from './JwtService';
import { IUser } from '../types/types';
import moment from 'moment';

describe('JwtService.ts', () => {
  it('can create a JWT token and verify it', () => {
    console.log(process.env);
    const service = new JwtService(
      process.env.JWT_RSA_PRIVATE_KEY,
      process.env.JWT_RSA_PUBLIC_KEY
    );
    const user: IUser = {
      id: 1,
      displayName: 'xxx',
      email: 'xxx@xxx.com'
    };
    const token = service.makeToken(user);
    const verified = service.verifyToken(token);

    const actualExpiryDate = moment(verified.exp * 1000);
    const expectedExpiryDate = moment().add(1, 'days');

    expect(verified.id).toBe(user.id);
    expect(verified.displayName).toBe(user.displayName);
    expect(verified.email).toBe(user.email);
    expect(verified.iat).not.toBeNull();
    expect(verified.exp).not.toBeNull();
    expect(actualExpiryDate.isSame(expectedExpiryDate, 'day')).toBeTruthy();
  });
});
