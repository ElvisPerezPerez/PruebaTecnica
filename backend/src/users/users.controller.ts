import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar usuarios',
    description: 'Obtiene todos los usuarios según los filtros de búsqueda.',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll(@Body() searchUser: SearchUserDto) {
    return this.usersService.findAll(searchUser);
  }
  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener usuario',
    description: 'Obtiene la información de un usuario por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  findOne(@Param('id') id: string, @Body() searchUser: SearchUserDto) {
    searchUser.id = +id;
    return this.usersService.findOne(searchUser);
  }
  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear usuario',
    description: 'Crea un nuevo usuario.',
  })
  @ApiBody({ type: CreateUserDto, description: 'Datos para crear el usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos del usuario autenticado.',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos para actualizar el usuario',
  })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar usuario',
    description: 'Elimina un usuario por su ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
