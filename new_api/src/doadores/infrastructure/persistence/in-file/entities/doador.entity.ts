// Ajustar as importações depois do refactor
// import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
// import { Doacao } from 'src/doacoes/entities/doacao.entity';

export class DoadorEntity {
    id: number;
    tipo_doacao: string;
    descricao: string;
    pessoa_id: number;
  
    // Ajustar as importações depois do refactor
    // pessoa?: pessoa;
    // doacao?: doacao;
  }
  
  