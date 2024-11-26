import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskfinishedComponent } from '../taskfinished/taskfinished.component';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { TaskResponse } from '../../core/models/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterModule, TaskfinishedComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrigido "styleUrl" para "styleUrls"
})
export class HomeComponent {
  modalTask: {
    id: number;
    name: string;
    description: string;
    status: string;
    dueDate: Date;
    color: string;
    categoryName: string;
    priority: string;
  } | null = null;

  opcaoSelecionada: string | null = null;
  exibirConteudo = true;
  categoriesMap: { [key: number]: string } = {
    1: 'Trabalho',
    2: 'Estudos',
    3: 'Lazer',
    // Adicione mais categorias conforme necessário
  };

  tasks: Array<{
    id: number;
    name: string;
    description: string;
    status: string;
    dueDate: Date;
    color: string;
    categoryName: string;
    priority: string;
  }> = [];

  prioritys: { [key: number]: string } = {
    0: 'Padrão',
    1: 'Baixa',
    2: 'Média',
    3: 'Alta',
  };

  statusKey: { [key: number]: string } = {
    0: 'A fazer',
    1: 'Fazendo',
    2: 'Finalizado',
  };

  constructor(private auth: AuthService, private taskService: TaskService) {
    const perfil = this.auth.getCurrentUser();
    const perfilId: number | null = perfil?.usr_id
      ? Number(perfil.usr_id)
      : null;

    if (perfilId) {
      this.taskService.getAll().subscribe({
        next: (data: TaskResponse[]) => {
          this.tasks = data
            .filter((task) => task.usr_id === perfilId)
            .map((task) => ({
              id: task.tsk_id,
              name: task.tsk_name,
              description: task.tsk_description,
              status: this.statusKey[task.tsksk_id] || 'Desconhecido',
              dueDate: new Date(task.tks_deadline_date),
              color: task.tsk_color,
              categoryName: this.categoriesMap[task.tsksk_id] || 'Desconhecida',
              priority: this.prioritys[task.tskpr_id],
            }));
        },
      });
    } else {
    }
  }

  mostrarConteudo() {
    this.exibirConteudo = true;
    this.opcaoSelecionada = null;
  }

  exibirOpcao(opcao: string) {
    this.exibirConteudo = false;
    this.opcaoSelecionada = opcao;
  }

  openModal(taskId: number): void {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.modalTask = { ...task };
      console.log('Tarefa encontrada:', this.modalTask);
    } else {
      console.error('Tarefa não encontrada para o ID:', taskId);
    }
  }

  excluir(taskId: number) {
    const id = taskId;
    console.log('ID da tarefa a ser excluída:', id);

    this.taskService.delete(id).subscribe(
      () => {
        console.log('Tarefa excluída com sucesso');
      },
      (error) => {
        console.error('Erro ao excluir tarefa:', error);
      }
    );
  }
}
