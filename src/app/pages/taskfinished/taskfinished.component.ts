import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-taskfinished',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './taskfinished.component.html',
  styleUrl: './taskfinished.component.scss'
})
export class TaskfinishedComponent {
 modalTask: { id: string, name: string, discricao: string, statuss: string, dueDate: Date, color: string, category: string } | null = null;
 
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
