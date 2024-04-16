import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrations1713291372806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`
        //         CREATE TABLE IF NOT EXISTS users  (
        //         id SERIAL PRIMARY KEY,
        //         email VARCHAR(255) NOT NULL,
        //         password_hash VARCHAR(60) NOT NULL
        //     );
        // `)
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'password_hash',
                    type: 'varchar',
                    length: '60',
                    isNullable: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
