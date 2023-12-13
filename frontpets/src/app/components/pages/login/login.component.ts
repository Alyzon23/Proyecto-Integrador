import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { LoginUsuarioDto } from '../../models/login-usuario.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  private authService: AuthService = inject(AuthService);
  private tokenService: TokenService = inject(TokenService);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  constructor(
    fb: FormBuilder,
  ) {
    this.loginForm = fb.group({
      nombreUsuario:  ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const login : LoginUsuarioDto  ={
      nombreUsuario: this.loginForm.get('nombreUsuario')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(login).subscribe(
      data => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          const isAdmin = this.tokenService.isAdmin();
          if (isAdmin === null) {
            // Error al obtener el rol del token
            this.toastrService.error('Error al obtener el rol del usuario', 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          } else if (isAdmin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/pages/citas']);
          }
        }
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
