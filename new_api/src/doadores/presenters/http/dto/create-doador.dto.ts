import { IsString, IsNumber, Length, Min } from 'class-validator';

export class CreateDoadorDto {
    @IsString()
    @Length(1, 255)
    tipo_doacao: string;

    @IsString()
    @Length(1, 255)
    descricao: string

    @IsNumber()
    @Min(1)
    pessoa_id: number;
}
