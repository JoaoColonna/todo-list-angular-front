import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

export const routes: Routes = [
  {
    path: '',
    title: 'ToDoList',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'ToDoList',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'acesso',
        title: 'Acesso',
        loadComponent: () =>
          import('./pages/acesso/acesso.component').then(
            (a) => a.AcessoComponent
          ),
      },
      {
        path: 'nova-tarefa',
        title: 'Criar Nova Tarefa',
        loadComponent: () =>
          import('./pages/cad-tsk/cad-tsk.component').then(
            (t) => t.CadTskComponent
          ),
      },
      {
        path: 'editar-tarefa/:id',
        title: 'Editar Tarefa',
        loadComponent: () =>
          import('./pages/up-tsk/up-tsk.component').then(
            (v) => v.UpTskComponent
          ),
      },
    ],
  },
];
