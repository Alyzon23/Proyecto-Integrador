import { Component, inject } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  nombreUsuario ='';
  isLogged      = true;
  isAdmin       = true;

    private tokenService: TokenService = inject(TokenService);

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
  }

  logOut(): void {
    this.tokenService.logOut();
  }

}
