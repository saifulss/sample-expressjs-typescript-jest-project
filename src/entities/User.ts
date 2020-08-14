import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
