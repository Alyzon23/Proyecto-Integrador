import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/entities/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly rolRepository: RolRepository,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async getall(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('no hay usuarios en la lista'),
      );
    return usuarios;
  }

  async create(dto: CreateUsuarioDto): Promise<any> {
    const { nombreUsuario, email } = dto;
    const exists = await this.usuarioRepository.findOne({
      where: [{ nombreUsuario: nombreUsuario }, { email: email }],
    });
    if (exists)
      throw new BadRequestException(new MessageDto('ese usuario ya existe'));
    const rolAdmin = await this.rolRepository.findOne({
      where: { rolNombre: RolNombre.ADMIN },
    });
    const rolUser = await this.rolRepository.findOne({
      where: { rolNombre: RolNombre.USER },
    });
    if (!rolAdmin || !rolUser)
      throw new InternalServerErrorException(
        new MessageDto('los roles aún no han sido creados'),
      );
    const admin = this.usuarioRepository.create(dto);
    admin.roles = [rolAdmin, rolUser];
    await this.usuarioRepository.save(admin);
    return new MessageDto('admin creado');
  }
}
