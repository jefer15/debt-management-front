import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt, DebtSummary } from '../../models/debt/debt.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private apiUrl = `${environment.uri}/debt`;

  constructor(private http: HttpClient) {}

  getDebts(status: 'all' | 'completed' | 'pending' = 'all'): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${this.apiUrl}?status=${status}`);
  }

  updateStatusDebt(id: number): Observable<Debt> {
    return this.http.patch<Debt>(`${this.apiUrl}/${id}/pay`, { status: 'completed' });
  }

  addDebt(debt: Omit<Debt, 'id' | 'createdAt' | 'userId'>): Observable<Debt> {
    return this.http.post<Debt>(`${this.apiUrl}`, debt);
  }

  editDebt(id: number, debt: Partial<Debt>): Observable<Debt> {
    return this.http.put<Debt>(`${this.apiUrl}/${id}`, debt);
  }

  getDebtById(id: number): Observable<Debt> {
    return this.http.get<Debt>(`${this.apiUrl}/${id}`);
  }

  deleteDebt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  exportDebts(format: 'json' | 'csv'): Observable<any> {
    return this.http.get(`${this.apiUrl}/export/${format}`);
  }

  getSummary(): Observable<DebtSummary> {
    return this.http.get<DebtSummary>(`${this.apiUrl}/summary`);
  }
}
