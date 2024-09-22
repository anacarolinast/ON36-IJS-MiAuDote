import { Injectable } from "@nestjs/common";
import { CreatePessoaDto } from "src/pessoas/presenters/http/dto/create-pessoa.dto";
import { v4 as uuidv4 } from 'uuid';
import { Pessoa } from "../pessoas";

@Injectable()
export class PessoaFactory {
    create(data: CreatePessoaDto): Pessoa {
        const pessoaId = uuidv4();

        return new Pessoa(
            pessoaId,
            data.nome,
            data.endereco,
            data.telefone,
            data.email,
            data.cpf,
        )
    }
}