import { Component, inject } from '@angular/core';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  nombreUsuario ='';

private tokenService :TokenService = inject(TokenService);

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getNombreUsuario() ?? '';
  }

}
