import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest, UserRequest } from '../../core/models/user';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';

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
  perfil: any;

  constructor(private auth: AuthService, private router: Router) {
    this.perfil = this.auth.getCurrentUser();
  }

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
    usr_email: ['', [Validators.required, Validators.email]],
    usr_password: ['', [Validators.required]],
  });

  cad = this.builder.group({
    usr_name: ['', [Validators.required]],
    usr_email: ['', [Validators.required, Validators.email]],
    usr_password: ['', [Validators.required]],
  });
  get f() {
    return this.cad.controls;
  }
  get fValue() {
    return this.cad.getRawValue();
  }

  async onSubmit() {
    if (this.cad.valid) {
      const userRequest = this.fValue;
      console.log('Dados enviados para cadastro:', userRequest);
      await this.auth.createUser(userRequest).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.cad.reset();
          this.container?.classList.remove('active');
        },
        error: (err) => {
          console.error('Erro ao criar usuário:', err);
        },
      });
    } else {
      console.error('Formulário inválido');
    }
  }
  async handleSubmit() {
    if (this.log.valid) {
      const { usr_email, usr_password } = this.log.getRawValue();

      try {
        const loginResponse = await this.auth.login({
          usr_email,
          usr_password,
        });

        if (loginResponse) {
          console.log('Login bem-sucedido:', loginResponse);
          this.router.navigate(['/']).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        } else {
          console.error('Erro no login');
        }
      } catch (error) {
        console.error('Erro durante o login:', error);
      }
    } else {
      console.error('Formulário inválido');
    }
  }
}
