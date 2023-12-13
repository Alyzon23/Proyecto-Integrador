export class ActualizarUsuarioDto {

  id?: number;

  nombreUsuario?: string;

  email?: string;


  constructor( nombreUsuario: string, email: string) {
      this.nombreUsuario = nombreUsuario;
      this.email = email;
  }
}
