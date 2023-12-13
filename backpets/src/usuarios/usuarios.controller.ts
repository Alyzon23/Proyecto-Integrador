import { Controller, Get, Post, Body, ValidationPipe, UsePipes, } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get()
  getAll() {
    return this.usuarioService.getall();
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }
}
