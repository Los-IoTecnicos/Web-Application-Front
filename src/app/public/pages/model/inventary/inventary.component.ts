import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private imageCompress: NgxImageCompressService) {
    // Definir el formulario y agregar validaciones a los campos necesarios
    this.inventoryForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]], // Asegura que la cantidad sea al menos 1
      rubro: ['', Validators.required],
      detalles: ['']
    });
  }

  // Método para acceder más fácil a los controles del formulario
  get f() {
    return this.inventoryForm.controls;
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
    this.submitted = true;  // Asegúrate de que submitted está siendo configurado a `true`
    console.log('Formulario enviado, valor de submitted:', this.submitted);

    // Si el formulario es inválido, mostramos los mensajes de error y detenemos la ejecución
    if (this.inventoryForm.invalid) {
      console.log('Formulario inválido, mostrando errores');
      return;
    }

    // Si el formulario es válido, creamos el objeto del producto
    const product = {
      photo: this.selectedFiles,
      nombre: this.inventoryForm.get('nombre')?.value,
      estado: this.inventoryForm.get('estado')?.value,
      fecha: this.inventoryForm.get('fecha')?.value,
      marca: this.inventoryForm.get('marca')?.value,
      cantidad: this.inventoryForm.get('cantidad')?.value,
      rubro: this.inventoryForm.get('rubro')?.value,
      detalles: this.inventoryForm.get('detalles')?.value,
    };

    console.log('Formulario válido, agregando producto:', product);

    // Añadir producto temporalmente a la lista y enviarlo a la API
    this.tempProducts.push(product);

    this.http.post('http://localhost:3000/productos', product).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );

    // Resetear el formulario y reiniciar el estado de submitted
    this.inventoryForm.reset();
    this.selectedFiles = [];
    this.submitted = false; // Reiniciar `submitted` para el próximo uso del formulario
    console.log('Formulario reseteado, valor de submitted:', this.submitted);
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



