import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
Name: string = '';

 constructor(private authService: AuthService) {
  const user = this.authService.getCurrentUser;
   if (!user) {
     this.Name = 'Nome do Usuário';
 }else{
  this.Name = user.name
 }
}
}
