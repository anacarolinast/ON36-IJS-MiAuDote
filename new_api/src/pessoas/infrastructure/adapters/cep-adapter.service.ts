import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { formatarEndereco } from '../helpers/formata-endereco';
import { ICepService } from '../../application/ports/cep-adapter.interface';

@Injectable()
export class CepService implements ICepService {
  constructor(private readonly httpService: HttpService) {}

  async consultaCep(cep: string): Promise<string | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`),
      );
      if (response.data.erro) {
        return null;
      }
      const endereco = formatarEndereco(response.data);

      return endereco;
    } catch (error) {
      return null;
    }
  }
}