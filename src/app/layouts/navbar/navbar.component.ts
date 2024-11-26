import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  Name: string = '';
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.Name = 'Nome do Usuário';
    } else {
      this.Name = this.user.usr_name || 'Nome do Usuário';
    }
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
