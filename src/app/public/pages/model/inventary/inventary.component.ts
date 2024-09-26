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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private imageCompress: NgxImageCompressService) {  // Inyectar el servicio
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

      this.tempProducts.push(product);

      this.http.post('http://localhost:3000/productos', product).subscribe(response => {
        console.log('Producto agregado:', response);
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
