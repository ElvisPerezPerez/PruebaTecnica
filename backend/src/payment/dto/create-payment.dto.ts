import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsInt, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 100.5,
    description:
      'Monto del pago. Debe ser un número positivo con decimales permitidos.',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto debe ser un número válido con hasta 2 decimales.' },
  )
  @IsPositive({ message: 'El monto debe ser mayor que cero.' })
  amount: number;

  @ApiProperty({
    example: 0,
    description: 'ID del usuario que realiza el pago',
  })
  @IsInt({ message: 'El ID de usuario debe ser un número entero.' })
  @Min(0, { message: 'El ID de usuario debe ser mayor que cero.' })
  userId: number;

  @ApiProperty({
    example: 0,
    description: 'ID de la tarjeta utilizada para el pago',
  })
  @IsInt({ message: 'El ID de tarjeta debe ser un número entero.' })
  @Min(0, { message: 'El ID de tarjeta debe ser mayor que cero.' })
  cardId: number;
}
