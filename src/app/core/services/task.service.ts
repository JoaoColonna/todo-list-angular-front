import { Injectable } from '@angular/core';
import { BaseApiClientService } from './base-api-client.service';
import { TaskRequest, TaskResponse } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endpointTask = 'task';
  private endpointTaskAll = 'tasks';

  constructor(
    private baseApiClient: BaseApiClientService<TaskRequest, TaskResponse>
  ) {}

  getAll(): Observable<TaskResponse[]> {
    return this.baseApiClient.getAll(this.endpointTaskAll);
  }

  getById(id: number): Observable<TaskResponse> {
    return this.baseApiClient.getById(this.endpointTask, id);
  }

  create(task: TaskRequest): Observable<TaskResponse> {
    console.log(task);
    return this.baseApiClient.post(this.endpointTask, task);
  }

  update(id: number, task: TaskRequest): Observable<TaskResponse> {
    return this.baseApiClient.update(this.endpointTask, id, task);
  }

  delete(id: number): Observable<void> {
    return this.baseApiClient.delete(this.endpointTask, id);
  }
}
