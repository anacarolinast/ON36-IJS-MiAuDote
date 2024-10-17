import { IsNumber, IsString, Length, Min } from 'class-validator';
import { CreateGastoDto } from '../../../../gastos/presenters/http/dto/create-gasto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsumivelDto extends CreateGastoDto{
    @ApiProperty()
    @IsString()
    @Length(1, 255)  
    tipo_animal: string;

    @ApiProperty()
    @IsString()
    @Length(1, 255)  
    descricao: string;
}
