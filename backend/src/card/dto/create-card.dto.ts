import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import IsIntPositiveOptional from 'src/common/decorators/is-int-positive-optional.decorator';

export class CreateCardDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID del usuario dueño de la tarjeta',
  })
  @IsIntPositiveOptional()
  userId: number;

  @ApiProperty({
    example: '4111111111111111',
    description: 'Número de tarjeta de crédito/débito',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/, {
    message: 'El número de tarjeta solo debe contener dígitos',
  })
  cardNumber: string;
}
