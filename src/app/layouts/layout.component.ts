import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-layouts',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class LayoutComponent {}
