import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';  // Importar el servicio

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent {
  inventoryForm: FormGroup;
  tempProducts: any[] = [];
  selectedFiles: string[] = [];
  showPopup: boolean = false; // Controla el pop-up

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private imageCompress: NgxImageCompressService) {
    this.inventoryForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', Validators.required],
      rubro: ['', Validators.required],
      detalles: ['']
    });
  }

  onFileSelected(event: any) {
    // Manejo de archivos...
  }

  addProduct() {
    if (this.inventoryForm.valid) {
      const product = {
        photo: this.selectedFiles,
        nombre: this.inventoryForm.get('nombre')?.value,
        estado: this.inventoryForm.get('estado')?.value,
        fecha: this.inventoryForm.get('fecha')?.value,
        marca: this.inventoryForm.get('marca')?.value,
        cantidad: this.inventoryForm.get('cantidad')?.value,
        rubro: this.inventoryForm.get('rubro')?.value,
        detalles: this.inventoryForm.get('detalles')?.value
      };

      this.tempProducts.push(product);

      this.http.post('http://localhost:3000/productos', product).subscribe(response => {
        console.log('Producto agregado:', response);
      });

      this.inventoryForm.reset();
      this.selectedFiles = [];
    }
  }

  togglePopup() {
    this.showPopup = !this.showPopup; // Alterna el estado del pop-up
  }

  viewDetails(product: any) {
    alert(`Detalles del producto: \n${JSON.stringify(product, null, 2)}`);
  }

  deleteProduct(product: any) {
    this.tempProducts = this.tempProducts.filter(p => p !== product);
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}