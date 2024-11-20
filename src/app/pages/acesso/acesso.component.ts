import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-acesso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './acesso.component.html',
  styleUrl: './acesso.component.scss',
})
export class AcessoComponent {
  private builder = inject(NonNullableFormBuilder);

  container: HTMLElement | null = null;
  ngOnInit() {
    this.container = document.getElementById('container');
  }

  toggleSignUp() {
    this.container?.classList.add('active');
  }
  toggleSignIn() {
    this.container?.classList.remove('active');
  }

  log = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  cad = this.builder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async onSubmit() {
    console.log(this.cad.value);
  }

  async handleSubmit() {
    console.log(this.log.value);
  }
}
