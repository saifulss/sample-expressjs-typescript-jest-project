import { User } from '../entities/User';
import { DatabaseConnection } from '../DatabaseConnection';
import { PasswordService } from './PasswordService';
import { IUser } from '../types/types';

interface IUserService {
  doesUserExist: (email: string) => Promise<boolean>
  createNewUser: (user: User) => Promise<User>
  getUserByEmailAndPassword: (email: string, password: string) => Promise<IUser>
}

export class UserService implements IUserService {
  async doesUserExist(email: string): Promise<boolean> {
    const connection = await DatabaseConnection.getInstance();
    const matchedUser = await connection
      .getRepository(User)
      .findOne({ email });
    return (!!matchedUser);
  }

  async createNewUser(user: IUser): Promise<User> {
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword(user.password);

    const newUser = new User();
    newUser.displayName = user.displayName;
    newUser.email = user.email;
    newUser.password = hashedPassword;

    const connection = await DatabaseConnection.getInstance();
    return await connection.getRepository(User).save(newUser);
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const passwordService = new PasswordService();
    const hashedPassword = await passwordService.hashPassword(password);

    const connection = await DatabaseConnection.getInstance();
    const matchedUser = await connection
      .getRepository(User)
      .findOne({ email, password: hashedPassword });

    if (!matchedUser) return null;

    return ({
      id: matchedUser.id,
      displayName: matchedUser.displayName,
      email: matchedUser.email
    });
  }
}
