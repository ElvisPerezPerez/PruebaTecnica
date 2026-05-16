import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear tarjeta',
    description: 'Crea una nueva tarjeta para un usuario.',
  })
  @ApiBody({ type: CreateCardDto, description: 'Datos para crear la tarjeta' })
  @ApiResponse({
    status: 201,
    description: 'Tarjeta creada correctamente',
    type: CreateCardDto,
  })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar tarjetas',
    description: 'Obtiene todas las tarjetas registradas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarjetas',
    type: [CreateCardDto],
  })
  findAll() {
    return this.cardService.findAll();
  }

  @Public()
  @Get('user/:userId')
  @ApiOperation({
    summary: 'Obtener tarjetas por usuario',
    description: 'Obtiene todas las tarjetas asociadas a un usuario.',
  })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarjetas del usuario',
    type: [CreateCardDto],
  })
  findByUser(@Param('userId') userId: string) {
    return this.cardService.findByUser(+userId);
  }
  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener tarjeta',
    description: 'Obtiene la información de una tarjeta por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarjeta' })
  @ApiResponse({
    status: 200,
    description: 'Tarjeta encontrada',
    type: CreateCardDto,
  })
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar tarjeta',
    description: 'Actualiza los datos de una tarjeta existente.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarjeta' })
  @ApiBody({
    type: UpdateCardDto,
    description: 'Datos para actualizar la tarjeta',
  })
  @ApiResponse({
    status: 200,
    description: 'Tarjeta actualizada',
    type: UpdateCardDto,
  })
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar tarjeta',
    description: 'Elimina una tarjeta por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarjeta' })
  @ApiResponse({ status: 200, description: 'Tarjeta eliminada' })
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
