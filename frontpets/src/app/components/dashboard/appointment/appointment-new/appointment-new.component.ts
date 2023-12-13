import { Component, inject } from '@angular/core';
import { Citas } from '../../../models/citas';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink,   } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitasService } from '../../../../services/citas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-new',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './appointment-new.component.html',
  styleUrl: './appointment-new.component.css'
})
export class AppointmentNewComponent {
  citasForm: FormGroup;
  id: string| null;

  private citasService: CitasService = inject(CitasService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  private aRoute: ActivatedRoute = inject(ActivatedRoute);

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
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.isEdit();
   }
  isEdit() {
   if(this.id !== null){
      this.citasService.detail(this.id).subscribe(
        data => {
          this.citasForm.setValue({
            nombre_paciente: data.nombre_paciente,
            nombre_mascota: data.nombre_mascota,
            fecha_nacimiento: data.fecha_nacimiento,
            especie: data.especie,
            raza: data.raza,
            fecha: data.fecha,
            hora: data.hora,
            motivo: data.motivo,
          });
        }
      )
   }
  }

  volver(): void {
    this.router.navigate(['/dashboard/citas']);
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
    if(this.id !== null){
      //editar
      this.citasService.update(this.id, citas).subscribe(
        data => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.volver();
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    }else{
      //nueva
      this.citasService.save(citas).subscribe(
        data => {
          this.toastr.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.volver();
        },
        err => {
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    }
  }

}
