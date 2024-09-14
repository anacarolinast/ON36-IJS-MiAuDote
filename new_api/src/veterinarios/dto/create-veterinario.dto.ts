import { IsString, IsNumber, Length, Min } from 'class-validator';

export class CreateVeterinarioDto {
    @IsString()
    @Length(1, 255)
    especialidade: string;

    @IsString()
    @Length(1, 10)
    registro_crmv: string;

    @IsNumber()
    @Min(1)
    pessoa_id: number;
}
