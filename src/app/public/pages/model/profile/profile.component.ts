import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  owner = {
    name: 'Juan Pérez',
    position: 'Propietario',
    email: 'juan.perez@restaurant.com',
    phone: '123-456-7890',
    restaurantName: 'Restaurante El Sabor',
    location: 'Madrid, España'
  };

  constructor(private router: Router) {}

  logout() {
    // Lógica para cerrar sesión si es necesario
    this.router.navigate(['/login']);
  }
}
