import { IsNumber, IsString, Min, Length } from 'class-validator';
import { CreatePessoaDto } from '../../../../pessoas/presenters/http/dto/create-pessoa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdotanteDto extends CreatePessoaDto{
    @ApiProperty()
    @IsNumber()
    @Min(0) 
    renda: number;

    @IsString()
    @ApiProperty()
    @Length(1, 255) 
    condicao_entrevista: string;
}
