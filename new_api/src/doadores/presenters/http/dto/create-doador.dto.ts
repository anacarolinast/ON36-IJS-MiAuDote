import { IsString, IsNumber, Length, Min } from 'class-validator';
import { CreatePessoaDto } from '../../../../pessoas/presenters/http/dto/create-pessoa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoadorDto extends CreatePessoaDto {
    @ApiProperty()
    @IsString()
    @Length(1, 255)
    tipo_doacao: string;

    @ApiProperty()
    @IsString()
    @Length(1, 255)
    descricao: string
}
