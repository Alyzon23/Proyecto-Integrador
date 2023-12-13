import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CitasEntity } from './entities/cita.entity';
import { CitasRepository } from './citas.repository';
import { Not } from 'typeorm';


@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(CitasEntity)
    private citasRepository: CitasRepository,
  ) {}

  async getAll(): Promise<CitasEntity[]> {
    const list = await this.citasRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('No hay citas'));
    }
    // Ordenar la lista de citas por el ID en orden descendente
    list.sort((a, b) => b.id - a.id);
    return list;
  }

  // si tengo tiempo lo hago
  async getAllFecha(): Promise<CitasEntity[]> {
    const list = await this.citasRepository.find();

    if (!list.length) {
      throw new NotFoundException(new MessageDto('No hay citas'));
    }
    // Obtener la fecha actual
    const currentDate = new Date();
    // Filtrar las citas por fecha
    const todayCitas = list.filter((cita) => {
      const citaDate = new Date(cita.fecha); // Asumiendo que la fecha de la cita se encuentra en la propiedad 'fecha'
      return citaDate.toDateString() === currentDate.toDateString();
    });
    // Ordenar las citas por ID en orden descendente
    todayCitas.sort((a, b) => b.id - a.id);
    // Filtrar las citas futuras
    const futureCitas = list.filter((cita) => {
      const citaDate = new Date(cita.fecha); // Asumiendo que la fecha de la cita se encuentra en la propiedad 'fecha'
      return citaDate > currentDate;
    });
    // Ordenar las citas futuras por fecha en orden ascendente
    futureCitas.sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
    );
    // Combinar las citas de hoy y las futuras
    const sortedCitas = [...todayCitas, ...futureCitas];
    return sortedCitas;
  }

  async findById(id: number): Promise<CitasEntity> {
    const citas = await this.citasRepository.findOne({
      where: { id: id },
    });
    if (!citas) {
      throw new NotFoundException(new MessageDto('No existe la cita'));
    }
    return citas;
  }

  async findByHora(hora: string): Promise<CitasEntity> {
    const cita = await this.citasRepository.findOne({
      where: { hora: hora },
    });

    if (cita && cita.fecha) {
      cita.fecha = new Date(cita.fecha);
    }

    return cita;
  }

  async create(dto: CreateCitaDto ): Promise<any> {
    const existingCita = await this.findByHora(dto.hora);

    if (existingCita) {
      // Verificar si la cita existente tiene la misma fecha y hora
      const existingDateTime = existingCita.fecha.getTime();
      const newDateTime = new Date(dto.fecha).setHours(
        Number(dto.hora.split(':')[0]),
        Number(dto.hora.split(':')[1]),
        0,
        0,
      );

      if (existingDateTime === newDateTime) {
        throw new BadRequestException(
          new MessageDto('¡No disponible! Elija otra hora'),
        );
      }
    }
    const citasSameDateTime = await this.citasRepository.find({
      where: {
        fecha: dto.fecha,
        hora: dto.hora,
      },
    });

    if (citasSameDateTime.length > 0) {
      throw new BadRequestException(
        new MessageDto('¡No disponible! Elija otra hora'),
      );
    }
    const citas = this.citasRepository.create(dto);
    await this.citasRepository.save(citas);
    return { message: 'Cita guardada' };
  }

  async update(id: number, dto: CreateCitaDto ): Promise<any> {
    const citas = await this.findById(id);
    if (!citas)
      throw new NotFoundException(new MessageDto('No existe la cita'));

    const citasDuplicadas = await this.citasRepository.find({
      where: {
        id: Not(id),
        fecha: dto.fecha,
        hora: dto.hora,
      },
    });

    if (citasDuplicadas.length > 0) {
      throw new BadRequestException(
        new MessageDto('Cita duplicada, no se puede actualizar'),
      );
    }

    citas.nombre_paciente = dto.nombre_paciente || citas.nombre_paciente;
    citas.nombre_mascota= dto.nombre_mascota|| citas.nombre_mascota;    
    citas.fecha = dto.fecha || citas.fecha;
    citas.hora = dto.hora || citas.hora;
    citas.motivo = dto.motivo || citas.motivo;
    await this.citasRepository.save(citas);
    return new MessageDto(
      `Cita del paciente ${citas.nombre_paciente} actualizada con su mascota ${citas.nombre_mascota}`,
    );
  }

  async delete(id: number): Promise<any> {
    const citas = await this.findById(id);
    await this.citasRepository.delete(citas);
    return new MessageDto(
      `cita del paciente: ${citas.nombre_paciente} eliminada`,
    );
  }
}
