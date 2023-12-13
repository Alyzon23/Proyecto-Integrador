import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  private authService: AuthService = inject(AuthService);
  private toastrService: ToastrService = inject( ToastrService);
  private router: Router = inject(Router);

  constructor(
    fb: FormBuilder,
  ) {
    this.registerForm = fb.group({
      nombreUsuario:  ['', Validators.required],
      email:['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const register = {
      nombreUsuario: this.registerForm.get('nombreUsuario')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.authService.registro(register).subscribe(
      data => {
        this.toastrService.success(data.message, 'Bienvenido', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/pages/login']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }


}
