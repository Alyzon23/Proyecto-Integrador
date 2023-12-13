export class Citas {

  id?: number;
  nombre_paciente: string;
  nombre_mascota: string;
  fecha_nacimiento: Date;
  especie: string;
  raza: string;
  fecha: Date;
  hora: string;
  motivo: string;

  constructor(nombre_paciente: string,  nombre_mascota: string, fecha_nacimiento: Date, especie: string, raza: string, fecha: Date, hora: string, motivo: string, ) {
    this.nombre_paciente = nombre_paciente;
    this.nombre_mascota  = nombre_mascota;
    this.fecha_nacimiento= fecha_nacimiento;
    this.especie         = especie;
    this.raza            = raza;
    this.fecha           = fecha;
    this.hora            = hora;
    this.motivo          = motivo;
  }
}
