import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  modalTask: { id: string, name: string, discricao: string, statuss: string, dueDate: Date, color: string, category: string } | null = null;
   opcaoSelecionada: string | null = null;
   exibirConteudo = true;

   mostrarConteudo() {
    this.exibirConteudo = true;
    this.opcaoSelecionada = null;
  }

  exibirOpcao(opcao: string) {
    this.exibirConteudo = false;
    this.opcaoSelecionada = opcao;
  }

  constructor(private http: HttpClient) {
  }

  tasks: Array<{ id: string, name: string, discricao: string, statuss: string, dueDate: Date, color: string, category: string }> = [];

  openModal(taskId: string): void {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task && task.id) {
      this.modalTask = task;
      console.log('Tarefa encontrada:', this.modalTask);
    } else {
      console.error('Tarefa não encontrada ou tarefa sem id:', taskId);
    }
  }
}
