import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728956006729 implements MigrationInterface {
    name = 'Migrations1728956006729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "consumiveis" ("id" SERIAL NOT NULL, "tipo_animal" character varying(255) NOT NULL, "descricao" character varying(255) NOT NULL, "gasto_id" integer NOT NULL, CONSTRAINT "REL_72e0681538ef0c35672f58c8dd" UNIQUE ("gasto_id"), CONSTRAINT "PK_ca015ff626943d3fb0128504668" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vacinas" ("id" SERIAL NOT NULL, "animal_id" integer NOT NULL, "data_vacinacao" TIMESTAMP NOT NULL, "tipo_vacina" character varying(255) NOT NULL, "veterinario_id" integer NOT NULL, "gasto_id" integer NOT NULL, CONSTRAINT "REL_b4836747dd8f141da571ce08d1" UNIQUE ("gasto_id"), CONSTRAINT "PK_e16f61530d871f2b74346c233ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animais" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "especie" character varying(255) NOT NULL, "sexo" character varying(1) NOT NULL, "data_nascimento" date NOT NULL, "condicao_saude" character varying(255) NOT NULL, "estado_adocao" character varying(255) NOT NULL, CONSTRAINT "PK_80a52ded49b9f912c01c566a334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicamentos" ("id" SERIAL NOT NULL, "animal_id" integer NOT NULL, "data_compra" TIMESTAMP NOT NULL, "descricao" character varying(255) NOT NULL, "veterinario_id" integer NOT NULL, "gasto_id" integer NOT NULL, CONSTRAINT "REL_13dd2697687215fd62c7e6e48c" UNIQUE ("gasto_id"), CONSTRAINT "PK_3985b0c130d1322e867f7ad5ee9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "veterinarios" ("id" SERIAL NOT NULL, "especialidade" character varying(255) NOT NULL, "registro_crmv" character varying(10) NOT NULL, "pessoa_id" integer NOT NULL, CONSTRAINT "REL_6e1e62399c7dbd971c6cc21a50" UNIQUE ("pessoa_id"), CONSTRAINT "PK_e3684772bab12067bdb378008bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "castracoes" ("id" SERIAL NOT NULL, "animal_id" integer NOT NULL, "data_castracao" date NOT NULL, "condicao_pos" character varying(255) NOT NULL, "veterinario_id" integer NOT NULL, "gasto_id" integer NOT NULL, CONSTRAINT "REL_389a2bba95d30e5017c34840e4" UNIQUE ("gasto_id"), CONSTRAINT "PK_559a65520e084e4daf9ea6e1f41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gastos" ("id" SERIAL NOT NULL, "data_gasto" TIMESTAMP NOT NULL, "tipo" character varying(255) NOT NULL, "quantidade" integer NOT NULL, "valor" numeric(10,2) NOT NULL, CONSTRAINT "PK_2b6965305b864a1ed8e6f6bf586" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doacoes" ("id" SERIAL NOT NULL, "doador_id" integer NOT NULL, "data_doacao" TIMESTAMP NOT NULL, "tipo_doacao" character varying(255) NOT NULL, "valor_estimado" numeric(10,2) NOT NULL, "gasto_id" integer NOT NULL, "doadorId" integer, CONSTRAINT "REL_7bd60594c9477a2ddf1560123f" UNIQUE ("gasto_id"), CONSTRAINT "PK_9a8e4661b18790b1dfa707b5291" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doadores" ("id" SERIAL NOT NULL, "tipo_doacao" character varying(255) NOT NULL, "descricao" character varying(255) NOT NULL, "pessoa_id" integer NOT NULL, CONSTRAINT "REL_67d29074c0f1b7e627edba3109" UNIQUE ("pessoa_id"), CONSTRAINT "PK_dd8a2e03edd114f3fe4a9919481" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pessoas" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "cep" character varying(255) NOT NULL, "endereco" character varying(255) NOT NULL, "telefone" text NOT NULL, "email" character varying(255) NOT NULL, "cpf" character varying(255) NOT NULL, CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adotante" ("id" SERIAL NOT NULL, "renda" integer NOT NULL, "condicao_entrevista" character varying NOT NULL, "pessoa_id" integer NOT NULL, CONSTRAINT "REL_c1967c46a381234c432b280e2d" UNIQUE ("pessoa_id"), CONSTRAINT "PK_9499de1697be0121476270d2b98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adocoes" ("id" SERIAL NOT NULL, "adotante_id" integer NOT NULL, "animal_id" integer NOT NULL, "data_adocao" TIMESTAMP NOT NULL, "condicoes_especiais" character varying NOT NULL, "status_aprovacao" character varying NOT NULL, "adotanteId" integer, CONSTRAINT "REL_ee4fd5f35fca242ff75291245c" UNIQUE ("animal_id"), CONSTRAINT "PK_4c5f560b2fa2ff462c930b5fc16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "consumiveis" ADD CONSTRAINT "FK_72e0681538ef0c35672f58c8ddd" FOREIGN KEY ("gasto_id") REFERENCES "gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacinas" ADD CONSTRAINT "FK_f21cab55e50101fd5f12d471cab" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacinas" ADD CONSTRAINT "FK_8ad97511afb946f7389697c19e6" FOREIGN KEY ("veterinario_id") REFERENCES "veterinarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacinas" ADD CONSTRAINT "FK_b4836747dd8f141da571ce08d19" FOREIGN KEY ("gasto_id") REFERENCES "gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicamentos" ADD CONSTRAINT "FK_ed42e11fe37076cffd7215a7738" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicamentos" ADD CONSTRAINT "FK_89c49be6e1a7aa117063628d252" FOREIGN KEY ("veterinario_id") REFERENCES "veterinarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicamentos" ADD CONSTRAINT "FK_13dd2697687215fd62c7e6e48cf" FOREIGN KEY ("gasto_id") REFERENCES "gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "veterinarios" ADD CONSTRAINT "FK_6e1e62399c7dbd971c6cc21a501" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "castracoes" ADD CONSTRAINT "FK_2e2cda6f4e341beca841e3c6cc8" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "castracoes" ADD CONSTRAINT "FK_8bf880775b0b6318a55debad55a" FOREIGN KEY ("veterinario_id") REFERENCES "veterinarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "castracoes" ADD CONSTRAINT "FK_389a2bba95d30e5017c34840e46" FOREIGN KEY ("gasto_id") REFERENCES "gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doacoes" ADD CONSTRAINT "FK_0303f292ffcbcba9dd5ecd20f8c" FOREIGN KEY ("doadorId") REFERENCES "doadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doacoes" ADD CONSTRAINT "FK_7bd60594c9477a2ddf1560123f0" FOREIGN KEY ("gasto_id") REFERENCES "gastos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doadores" ADD CONSTRAINT "FK_67d29074c0f1b7e627edba31097" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adotante" ADD CONSTRAINT "FK_c1967c46a381234c432b280e2de" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adocoes" ADD CONSTRAINT "FK_33ca3075e595e54d6487573ca03" FOREIGN KEY ("adotanteId") REFERENCES "adotante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adocoes" ADD CONSTRAINT "FK_ee4fd5f35fca242ff75291245cc" FOREIGN KEY ("animal_id") REFERENCES "animais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adocoes" DROP CONSTRAINT "FK_ee4fd5f35fca242ff75291245cc"`);
        await queryRunner.query(`ALTER TABLE "adocoes" DROP CONSTRAINT "FK_33ca3075e595e54d6487573ca03"`);
        await queryRunner.query(`ALTER TABLE "adotante" DROP CONSTRAINT "FK_c1967c46a381234c432b280e2de"`);
        await queryRunner.query(`ALTER TABLE "doadores" DROP CONSTRAINT "FK_67d29074c0f1b7e627edba31097"`);
        await queryRunner.query(`ALTER TABLE "doacoes" DROP CONSTRAINT "FK_7bd60594c9477a2ddf1560123f0"`);
        await queryRunner.query(`ALTER TABLE "doacoes" DROP CONSTRAINT "FK_0303f292ffcbcba9dd5ecd20f8c"`);
        await queryRunner.query(`ALTER TABLE "castracoes" DROP CONSTRAINT "FK_389a2bba95d30e5017c34840e46"`);
        await queryRunner.query(`ALTER TABLE "castracoes" DROP CONSTRAINT "FK_8bf880775b0b6318a55debad55a"`);
        await queryRunner.query(`ALTER TABLE "castracoes" DROP CONSTRAINT "FK_2e2cda6f4e341beca841e3c6cc8"`);
        await queryRunner.query(`ALTER TABLE "veterinarios" DROP CONSTRAINT "FK_6e1e62399c7dbd971c6cc21a501"`);
        await queryRunner.query(`ALTER TABLE "medicamentos" DROP CONSTRAINT "FK_13dd2697687215fd62c7e6e48cf"`);
        await queryRunner.query(`ALTER TABLE "medicamentos" DROP CONSTRAINT "FK_89c49be6e1a7aa117063628d252"`);
        await queryRunner.query(`ALTER TABLE "medicamentos" DROP CONSTRAINT "FK_ed42e11fe37076cffd7215a7738"`);
        await queryRunner.query(`ALTER TABLE "vacinas" DROP CONSTRAINT "FK_b4836747dd8f141da571ce08d19"`);
        await queryRunner.query(`ALTER TABLE "vacinas" DROP CONSTRAINT "FK_8ad97511afb946f7389697c19e6"`);
        await queryRunner.query(`ALTER TABLE "vacinas" DROP CONSTRAINT "FK_f21cab55e50101fd5f12d471cab"`);
        await queryRunner.query(`ALTER TABLE "consumiveis" DROP CONSTRAINT "FK_72e0681538ef0c35672f58c8ddd"`);
        await queryRunner.query(`DROP TABLE "adocoes"`);
        await queryRunner.query(`DROP TABLE "adotante"`);
        await queryRunner.query(`DROP TABLE "pessoas"`);
        await queryRunner.query(`DROP TABLE "doadores"`);
        await queryRunner.query(`DROP TABLE "doacoes"`);
        await queryRunner.query(`DROP TABLE "gastos"`);
        await queryRunner.query(`DROP TABLE "castracoes"`);
        await queryRunner.query(`DROP TABLE "veterinarios"`);
        await queryRunner.query(`DROP TABLE "medicamentos"`);
        await queryRunner.query(`DROP TABLE "animais"`);
        await queryRunner.query(`DROP TABLE "vacinas"`);
        await queryRunner.query(`DROP TABLE "consumiveis"`);
    }
}
