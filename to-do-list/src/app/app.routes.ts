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
    ],
  },
];
