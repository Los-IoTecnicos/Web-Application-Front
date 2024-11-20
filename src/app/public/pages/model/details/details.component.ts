import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  produtos: Product[] | null = [];
  equipmentDetails: Equipment | null = null;
  fridgeTitle: string | null = null;
  showAlert: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.fridgeTitle = localStorage.getItem('selectedFridgeTitle');
    this.loadProducts();
    if (this.fridgeTitle) {
      this.loadEquipment(this.fridgeTitle);
    }
  }

  loadProducts(): void {
    const url = 'https://66f616ba436827ced975e4d6.mockapi.io/api/v1/product';
    this.http.get<Product[]>(url).subscribe(
      (products: Product[]) => {
        this.produtos = products.slice(0, 6);
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  loadEquipment(title: string): void {
    const url = 'https://66f616ba436827ced975e4d6.mockapi.io/api/v1/refrigeration';
    this.http.get<Equipment[]>(url).subscribe(
      (equipmentList: Equipment[]) => {
        this.equipmentDetails = equipmentList.find(equip => equip.title === title) || null;
      },
      (error) => {
        console.error('Error al cargar los detalles del equipo:', error);
      }
    );
  }

  isMaintenanceDue(): boolean {
    if (this.equipmentDetails && this.equipmentDetails.nextMaintenance && this.showAlert) {
      const nextMaintenanceDate = new Date(this.equipmentDetails.nextMaintenance);
      const today = new Date();
      return nextMaintenanceDate < today;
    }
    return false;
  }

  closeAlert(): void {
    this.showAlert = false;
  }
}
