import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../public/components/navbar/navbar.component';
import { MatGridListModule} from "@angular/material/grid-list";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {
  cards = [
    { image: 'src/assets/images/image_refrigerator.png', title: 'Camara A2', description: 'Activo' },
    { image: "src/assets/images/image_refrigerator.png", title: 'Refrigerador EA2', description: 'En Mantenimiento' },
    { image: "src/assets/images/image_refrigerator.png", title: 'Refrigerador EA3', description: 'Activo' },
    { image: "src/assets/images/image_refrigerator.png", title: 'Refrigerador EA6', description: 'Activo' },
    { image: "src/assets/images/image_refrigerator.png", title: 'Refrigerador EA8', description: 'Activo' },
    // Añade más cards según sea necesario

  ];

  tiles: Tile[] = [
    {text: 'Notificaciones', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Inventario', cols: 1, rows: 2, color: '#5D58D3'},
    {text: 'Colaboradores', cols: 1, rows: 1, color: '#8289EF'},
    {text: 'Sensores', cols: 2, rows: 1, color: '#262A73'},
  ];
  constructor() {
    console.log(this.cards); // Verifica que los datos se están cargando correctamente
  }

  getTextColor(description: string): string {
    return description.includes('Activo') ? 'green' : 'red';
  }
}


