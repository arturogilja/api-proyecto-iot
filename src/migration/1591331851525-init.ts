import {MigrationInterface, QueryRunner} from "typeorm";

export class init1591331851525 implements MigrationInterface {
    name = 'init1591331851525'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `item` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NOT NULL, `active` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `item`", undefined);
    }

}
