import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { routesPages } from './components/pages/app_pages.routes';
import { routesDashboard } from './components/dashboard/app_dashboard.routes';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { interceptorProvider } from './interceptors/citas.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRouter(routesPages),
    provideRouter(routesDashboard),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(),
    interceptorProvider // Toastr providers
  ]
};
