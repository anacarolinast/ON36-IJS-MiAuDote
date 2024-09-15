import { IsString, IsNumber, Length, Min } from 'class-validator';

export class CreateDoadorDto {
    @IsString()
    @Length(1, 255)
    tipo_adocao: string;

    @IsString()
    @Length(1, 255)

    @IsNumber()
    @Min(1)
    pessoa_id: number;
}
