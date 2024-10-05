export interface ICepService {
    consultaCep(cep: string): Promise<string | null>;
  }