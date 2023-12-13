import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged = true;

  private tokenService: TokenService = inject(TokenService);
  private router: Router= inject(Router);

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigate(['/']);
  }

}
