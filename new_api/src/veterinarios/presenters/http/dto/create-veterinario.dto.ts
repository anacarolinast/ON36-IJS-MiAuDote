import { IsString, IsNumber, Length, Min } from 'class-validator';
import { CreatePessoaDto } from '../../../../pessoas/presenters/http/dto/create-pessoa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVeterinarioDto extends CreatePessoaDto {
    @ApiProperty()
    @IsString()
    @Length(1, 255)
    especialidade: string;

    @ApiProperty()
    @IsString()
    @Length(1, 10)
    registro_crmv: string;
}
