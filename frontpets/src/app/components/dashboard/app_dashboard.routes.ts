import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentNewComponent } from './appointment/appointment-new/appointment-new.component';
import { DashboardGuard } from '../../guards/dashboard.guard';

export const routesDashboard: Routes= [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {path: '', component: MainComponent},
      {path: 'citas', component: AppointmentComponent},
      {path: 'cita-editar/:id', component: AppointmentNewComponent},
      {path: 'cita-nueva', component: AppointmentNewComponent},
    ]
  }
];
