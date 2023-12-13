import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cita-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cita-detail.component.html',
  styleUrl: './cita-detail.component.css'
})
export class CitaDetailComponent {

  nombre_paciente     = '';
  nombre_mascota      = '';
  especie             = '';
  fecha               = new Date();
  hora                = '';
  motivo              = '';

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nombre_paciente = params['nombre_paciente'];
      this.nombre_mascota = params['nombre_mascota'];
      this.especie = params['especie'];
      this.fecha = new Date(params['fecha']);
      this.hora = params['hora'];
      this.motivo = params['motivo'];
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
