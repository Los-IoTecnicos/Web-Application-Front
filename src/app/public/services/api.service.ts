import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://66f616ba436827ced975e4d6.mockapi.io/api/v1/refrigeration';

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de refrigeradores
  getRefrigerators(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
