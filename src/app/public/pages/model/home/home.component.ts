import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  refrigerators: Refrigerator[] = [];
  selectedRefrigerator: Refrigerator | null = null;
  mostrarDetalles = false;

  tiles: Tile[] = [
    {text: 'Notificaciones', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Inventario', cols: 1, rows: 2, color: '#5D58D3'},
    {text: 'Colaboradores', cols: 1, rows: 1, color: '#8289EF'},
    {text: 'Sensores', cols: 2, rows: 1, color: '#262A73'},
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRefrigerators();
  }

  loadRefrigerators() {
    this.http.get<Refrigerator[]>('http://localhost:3000/refrigeration').subscribe(
      data => {
        this.refrigerators = data;
      },
      error => {
        console.error('Error fetching refrigerators:', error);
      }
    );
  }

  getTextColor(description: string): string {
    return description.includes('Activo') ? 'green' : 'red';
  }

  viewDetails(refrigerator: Refrigerator) {
    this.selectedRefrigerator = refrigerator;
    this.mostrarDetalles = true;
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
    this.selectedRefrigerator = null;
  }
}
