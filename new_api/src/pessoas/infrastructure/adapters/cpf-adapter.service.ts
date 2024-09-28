import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CpfService {
  constructor(private readonly httpService: HttpService) {}

  async validaCpf(cpf: string): Promise<{ nome: string } | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://www.cpf-api.com.br/api/v1/cpf/${cpf}`)
      );
      
      if (response.data && response.data.success) {
        return { nome: response.data.data.nome };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao consultar CPF:', error);
      return null;
    }
  }
}
