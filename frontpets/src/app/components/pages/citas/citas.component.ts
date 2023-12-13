import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CitasService } from '../../../services/citas.service';
import { ToastrService } from 'ngx-toastr';
import { Citas } from '../../models/citas';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
})
export class CitasComponent {
  citasForm: FormGroup;
  isLogged = true;

  private citasService: CitasService = inject(CitasService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private tokenService: TokenService = inject(TokenService);

  constructor(fb: FormBuilder) {
    this.citasForm = fb.group({
      nombre_paciente: ['', Validators.required],
      nombre_mascota: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
  }

  onSubmit() {
    const citas: Citas = {
      nombre_paciente: this.citasForm.get('nombre_paciente')?.value,
      nombre_mascota: this.citasForm.get('nombre_mascota')?.value,
      fecha_nacimiento: this.citasForm.get('fecha_nacimiento')?.value,
      especie: this.citasForm.get('especie')?.value,
      raza: this.citasForm.get('raza')?.value,
      fecha: this.citasForm.get('fecha')?.value,
      hora: this.citasForm.get('hora')?.value,
      motivo: this.citasForm.get('motivo')?.value,
    };
    this.citasService.save(citas).subscribe(
      (data) => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['/pages/detalle'], {
          relativeTo: this.route,
          queryParams: {
            nombre_paciente: this.citasForm.get('nombre_paciente')!.value,
            nombre_mascota: this.citasForm.get('nombre_mascota')!.value,
            especie: this.citasForm.get('especie')!.value,
            fecha: this.citasForm.get('fecha')!.value,
            hora: this.citasForm.get('hora')!.value,
            motivo: this.citasForm.get('motivo')!.value,
          },
        });
      },
      (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
