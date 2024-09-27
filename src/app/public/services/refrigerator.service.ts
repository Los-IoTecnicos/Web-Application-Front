import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Refrigerator {
  id: number;
  title: string;
  description: string;
  capacity: string;
  image: string;
  temperature: string;
  humidity: string;
  lastMaintenance: string;
  nextMaintenance: string;
  model: string;
  serialNumber: string;
  installedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class RefrigeratorService {

  constructor(private apiService: ApiService) { }

  // Método para obtener la lista de refrigeradores a través de ApiService
  getRefrigerators(): Observable<Refrigerator[]> {
    return this.apiService.getRefrigerators();
  }
}
