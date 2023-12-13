import { TokenDto } from './dto/token.dto';
import { LoginUsuarioDto } from './dto/login.dto';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll() {
    return this.authService.getall();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.authService.findById(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('nuevo')
  create(@Body() dto: NuevoUsuarioDto) {
    return this.authService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.authService.delete(id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('login')
  login(@Body() dto: LoginUsuarioDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: TokenDto) {
    return this.authService.refresh(dto);
  }
}
