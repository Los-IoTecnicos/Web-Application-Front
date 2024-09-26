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
  link = "https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png?ex=66f66ac9&is=66f51949&hm=d6b30d99001e42b8e40f5fea5603c447ec1e667cb91d8fc6386a4ff55a126731&";
  cards = [
    { image: this.link, title: 'Camara A2', description: 'Activo', capacity: 'Capacidad: 80%' },
    { image: this.link, title: 'Refrigerador EA2', description: 'En Mantenimiento', capacity: 'Capacidad: 0%'  },
    { image: this.link, title: 'Refrigerador EA3', description: 'Activo', capacity: 'Capacidad: 50%' },
    { image: this.link, title: 'Refrigerador EA6', description: 'Activo', capacity: 'Capacidad: 50%' },
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


