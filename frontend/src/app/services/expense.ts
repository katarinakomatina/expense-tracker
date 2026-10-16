import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../models/expense';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private http = inject(HttpClient);
  private url: string = API_URL + '/api/troskovi';

  getAll(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(this.url);
  }

  getById(id: number): Observable<ExpenseModel> {
    return this.http.get<ExpenseModel>(this.url + '/' + id);
  }

  add(trosak: ExpenseModel): Observable<ExpenseModel> {
    return this.http.post<ExpenseModel>(this.url, trosak);
  }

  update(trosak: ExpenseModel): Observable<ExpenseModel> {
    return this.http.put<ExpenseModel>(this.url + '/' + trosak.id, trosak);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
