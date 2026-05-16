import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Procesar un pago',
    description:
      'Crea un nuevo pago y procesa el resultado con el microservicio externo.',
  })
  @ApiBody({ type: CreatePaymentDto, description: 'Datos para crear el pago' })
  @ApiResponse({
    status: 201,
    description: 'Resultado del procesamiento del pago',
    type: PaymentResponseDto,
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Public()
  @Get('user/:userId')
  @ApiOperation({
    summary: 'Obtener pagos por usuario',
    description: 'Lista todos los pagos realizados por un usuario específico.',
  })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos del usuario',
    type: [CreatePaymentDto],
  })
  findByUser(@Param('userId') userId: string) {
    return this.paymentService.findByUser(+userId);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un pago',
    description: 'Obtiene la información de un pago por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del pago' })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado',
    type: CreatePaymentDto,
  })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un pago',
    description: 'Elimina un pago por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del pago' })
  @ApiResponse({ status: 200, description: 'Pago eliminado' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
