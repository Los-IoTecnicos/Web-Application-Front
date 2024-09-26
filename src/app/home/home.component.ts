import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../public/components/navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = [
    { image: '/assets/images/refrigerator.jpg', title: 'Refrigerador EA1', description: 'Estado: Activo' },
    { image: "/assets/images/image_refrigerator.png", title: 'Refrigerador EA2', description: 'Estado: Activo' },
    { image: "/assets/images/image_refrigerator.png", title: 'Refrigerador EA3', description: 'Estado: Activo' },
    // Añade más cards según sea necesario
  ];
  constructor() {
    console.log(this.cards); // Verifica que los datos se están cargando correctamente
  }

}
