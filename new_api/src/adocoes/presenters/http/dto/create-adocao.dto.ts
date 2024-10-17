import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsString, Length, Min } from 'class-validator';

export class CreateAdocaoDto {
    @ApiProperty()
    @IsNumber()
    @Min(1) 
    adotante_id: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)  
    animal_id: number;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    data_adocao: Date;

    @ApiProperty()
    @IsString()
    @Length(0, 255) 
    condicoes_especiais: string;

    @ApiProperty()
    @IsString()
    @Length(1, 255)
    status_aprovacao: string;
}
