import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { CitaDetailComponent } from './cita-detail/cita-detail.component';

export const routesPages: Routes = [
  {
    path: 'pages', component: PagesComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'citas', component: CitasComponent},
      {path: 'detalle', component: CitaDetailComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'about', component: AboutComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'location', component: LocationComponent},
      {path:'', redirectTo:'/pages', pathMatch:'full'},
    ]
  }
];
