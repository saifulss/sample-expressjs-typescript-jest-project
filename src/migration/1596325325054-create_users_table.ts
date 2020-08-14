import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1596325325054 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'bigserial',
          isPrimary: true
        },
        {
          name: 'display_name',
          type: 'varchar',
          length: '255'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255'
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }

}
