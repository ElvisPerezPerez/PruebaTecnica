import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({
    example: 'approved',
    description: 'Estado del pago: approved o rejected',
  })
  status: 'approved' | 'rejected';
}
