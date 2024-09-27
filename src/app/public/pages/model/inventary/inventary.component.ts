import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxImageCompressService } from 'ngx-image-compress';
import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {
  inventoryForm: FormGroup;
  tempProducts: any[] = [];
  selectedFiles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,  // Inyectar el servicio
    private imageCompress: NgxImageCompressService
  ) {
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

  ngOnInit() {
    this.loadProducts();  // Cargar productos al inicializar el componente
  }

  loadProducts() {
    this.inventoryService.getProducts().subscribe((products: any[]) => {
      this.tempProducts = products;
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result;

        // Comprimir la imagen antes de almacenarla
        this.imageCompress.compressFile(imageBase64, -1, 50, 50).then(
          compressedImage => {
            this.selectedFiles.push(compressedImage);  // Guardar la imagen comprimida
          }
        );
      };
      reader.readAsDataURL(file);
    }
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

      this.inventoryService.addProduct(product).subscribe((response: any) => {
        console.log('Producto agregado:', response);
        this.tempProducts.push(response);  // Agregar el producto a la lista temporal
      });

      this.inventoryForm.reset();
      this.selectedFiles = [];
    }
  }

  viewDetails(product: any) {
    const details = `
      Nombre: ${product.nombre}
      Estado: ${product.estado}
      Fecha de Ingreso: ${product.fecha}
      Marca: ${product.marca}
      Cantidad: ${product.cantidad}
      Rubro: ${product.rubro}
      Detalles: ${product.detalles}
    `;
    alert(details);
  }

  deleteProduct(product: any) {
    this.tempProducts = this.tempProducts.filter(p => p !== product);
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}
