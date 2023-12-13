import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";
import { IsValidDate } from "src/decorators/is-valid-date";

export class CreateCitaDto {
    
  @IsNotBlank({ message: 'el nombre no puede estar vacío' })
  nombre_paciente: string;

  @IsNotBlank({ message: 'el nombre de la mascota no puede estar vacío' })
  nombre_mascota: string;

  @IsValidDate()
  @IsNotEmpty()
  fecha_nacimiento: Date;

  @IsNotBlank({ message: 'la especie no puede estar vacío' })
  especie: string;

  @IsOptional()
  @IsString()
  raza: string;

  @IsValidDate()
  @IsNotEmpty()
  fecha: Date;

  @IsNotBlank({ message: 'elije una hora por' })
  hora: string;

  @IsOptional()
  @IsString()
  motivo?: string;
    
}
