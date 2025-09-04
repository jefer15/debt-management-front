import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private apiUrl = `${environment.uri}/debt`;

  constructor(private http: HttpClient) {}

  getDebts(status: 'all' | 'completed' | 'pending' = 'all'){
    return this.http.get<any[]>(`${this.apiUrl}?status=${status}`);
  }

  updateStatusDebt(id: number){
    return this.http.patch(`${this.apiUrl}/${id}`, { status: 'completed' });
  }

  addDebt(debt: any){
    return this.http.post(`${this.apiUrl}`, debt);
  }

  editDebt(id: number, debt: any){
    return this.http.put(`${this.apiUrl}/${id}`, debt);
  }

  getDebtById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
