import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';
import { TaskRequest } from '../../core/models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cad-tsk',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cad-tsk.component.html',
  styleUrls: ['./cad-tsk.component.scss'],
})
export class CadTskComponent {
  isOtherSelected = false;
  categor: { name: string }[] = [];
  colors = [
    { name: 'Default', value: 'white' },
    { name: 'Azul acinzentado', value: '#789DBC' },
    { name: 'Rosa claro', value: ' #FFE3E3' },
    { name: 'Creme', value: ' #FEF9F2' },
    { name: 'Verde pastel', value: '#C9E9D2' },
  ];
  prioritys = [
    { name: 'Padrão', value: 0 },
    { name: 'Baixa', value: 1 },
    { name: 'Média', value: 2 },
    { name: 'Alta', value: 3 },
  ];

  private builder = inject(NonNullableFormBuilder);

  form = this.builder.group({
    tsk_name: ['', [Validators.required]],
    tsk_description: ['', [Validators.required]],
    tks_deadline_date: ['', [Validators.required]],
    tsk_color: ['', [Validators.required]],
    tskpr_id: [0, [Validators.required]],
    tsksk_id: [0],
    usr_id: [0],
  });

  cat = this.builder.group({
    category: ['', [Validators.required]],
  });

  customCategoryControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.form.get('usr_id')?.setValue(parseInt(user.usr_id || '0', 10));
    }
  }

  onCategoryChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isOtherSelected = selectedValue === 'outra';

    if (!this.isOtherSelected) {
      this.cat.get('category')?.setValue(selectedValue);
    } else {
      this.cat.get('category')?.setValue('');
      this.customCategoryControl.setValue('');
    }
  }

  onCustomCategoryInput(event: Event): void {
    const customCategoryValue = (event.target as HTMLInputElement).value;
    this.cat.get('category')?.setValue(customCategoryValue);
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day} 00:00:00`;
  }

  async onSubmit() {
    if (this.form.valid) {
      const {
        tsk_name,
        tsk_description,
        tks_deadline_date,
        tsk_color,
        tskpr_id,
        tsksk_id,
        usr_id,
      } = this.form.getRawValue();

      if (!usr_id || usr_id <= 0) {
        console.error('ID do usuário inválido');
        return;
      }

      const isValidDate = !isNaN(new Date(tks_deadline_date).getTime());
      if (!isValidDate) {
        console.error('Data de deadline inválida');
        return;
      }

      if (!tsk_name || !tsk_description || !tsk_color) {
        console.error('Faltando campos obrigatórios');
        return;
      }

      const taskPayload: TaskRequest = {
        tsk_name,
        tsk_description,
        tks_deadline_date: this.formatDate(tks_deadline_date),
        tsk_color,
        tskpr_id: Number(tskpr_id),
        tsksk_id,
        usr_id,
      };

      console.log('Payload da tarefa:', taskPayload);

      try {
        const createdTask = await this.taskService
          .create(taskPayload)
          .toPromise();
        console.log('Tarefa criada com sucesso:', createdTask);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    } else {
      console.error('Formulário inválido');
    }
  }
}
