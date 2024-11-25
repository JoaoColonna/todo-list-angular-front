import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiClientService<TRequest, TResponse> {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAll(endpoint: string): Observable<TResponse[]> {
    return this.http.get<TResponse[]>(`${this.apiUrl}/${endpoint}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(endpoint: string, id: number): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.apiUrl}/${endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, item: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}/${endpoint}`, item)
      .pipe(catchError(this.handleError));
  }

  update(endpoint: string, id: number, item: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.apiUrl}/${endpoint}/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
