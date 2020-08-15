import { Connection, createConnection } from 'typeorm';

export class DatabaseConnection {
  private static instance: Connection;

  private constructor() {
    throw Error('This should never run!');
  }

  static async getInstance(): Promise<Connection> {
    if (!this.instance) this.instance = await createConnection();
    return this.instance;
  }
}
