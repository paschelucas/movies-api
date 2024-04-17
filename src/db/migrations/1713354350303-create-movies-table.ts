import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMoviesTable1713354350303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movies')
    }

}
