import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Definición de la interfaz Product
export interface Product {
  id: string;
  nombre: string;
  estado: string;
  fecha: string;
  marca: string;
  cantidad: number;
  rubro: string;
  detalles: string;
  photo: string | string[];
}

// Definición de la interfaz Equipment
export interface Equipment {
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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  produtos: Product[] | null = [];  // Cambiar a un array para almacenar múltiples productos
  equipmentDetails: Equipment | null = null;  // Para almacenar detalles del equipo
  fridgeTitle: string | null = null;  // Para almacenar el título del equipo seleccionado

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.fridgeTitle = localStorage.getItem('selectedFridgeTitle');
    
    this.loadProducts();  // Cargar todos los productos
    if (this.fridgeTitle) {
      this.loadEquipment(this.fridgeTitle);  // Cargar detalles del equipo si hay un título
    }
  }

  loadProducts(): void {
    const url = 'http://localhost:3000/productos';  // Asegúrate de que esta URL sea correcta
    this.http.get<Product[]>(url).subscribe(
      (products: Product[]) => {
        this.produtos = products.slice(0, 6);  // Obtener solo los primeros 6 productos
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  loadEquipment(title: string): void {
    const url = 'http://localhost:3000/equipment';  // Asegúrate de que esta URL sea correcta
    this.http.get<Equipment[]>(url).subscribe(
      (equipmentList: Equipment[]) => {
        this.equipmentDetails = equipmentList.find(equip => equip.title === title) || null;  // Encuentra el equipo por título
      },
      (error) => {
        console.error('Error al cargar los detalles del equipo:', error);
      }
    );
  }
}
