export interface ICpfService {
    consultaCpf(cpf: string): Promise<string | null>;
  }