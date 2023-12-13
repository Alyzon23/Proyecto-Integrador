import { Component, inject } from '@angular/core';
import { Citas } from '../../models/citas';
import { CitasService } from '../../../services/citas.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  citas: Citas[] = [];
  listaVacia: string | undefined;

private citasService: CitasService = inject(CitasService);

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasService.lista().subscribe(
      (data: Citas[]) => {
        this.citas = data;
        this.listaVacia = undefined;
      },
      () => {
        this.listaVacia = 'No hay Citas';
      }
    );
  }

  borrar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si elimina la cita no podra recuperarla',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.citasService.delete(id).subscribe(() => {
          this.cargarCitas();
          Swal.fire('OK', 'Cita eliminada', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Se conserva la cita', 'error');
      }
    });
  }

}
