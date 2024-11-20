import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent implements OnInit {
  inventoryForm: FormGroup;
  tempProducts: any[] = [];
  selectedFiles: string[] = [];
  submitted = false;
  selectedProduct: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {
    this.inventoryForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      fecha: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      rubro: ['', Validators.required],
      detalles: ['']
    });
  }

  get f() {
    return this.inventoryForm.controls;
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('https://66f616ba436827ced975e4d6.mockapi.io/api/v1/product').subscribe(
      (data) => {
        console.log('Productos obtenidos:', data);
        this.tempProducts = data;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result;

        this.imageCompress.compressFile(imageBase64, -1, 50, 50).then(
          compressedImage => {
            console.log("Imagen comprimida:", compressedImage);
            this.selectedFiles.push(compressedImage);
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    this.submitted = true;
    if (this.inventoryForm.invalid) {
      console.log('Formulario inválido, mostrando errores');
      return;
    }

    const product = {
      id: Date.now().toString(),
      photo: this.selectedFiles.length > 0 ? this.selectedFiles : ['assets/images/placeholder.png'],
      nombre: this.inventoryForm.get('nombre')?.value,
      estado: this.inventoryForm.get('estado')?.value,
      fecha: this.inventoryForm.get('fecha')?.value,
      marca: this.inventoryForm.get('marca')?.value,
      cantidad: this.inventoryForm.get('cantidad')?.value,
      rubro: this.inventoryForm.get('rubro')?.value,
      detalles: this.inventoryForm.get('detalles')?.value,
    };

    console.log('Producto a agregar:', product);

    this.http.post('https://66f616ba436827ced975e4d6.mockapi.io/api/v1/product', product).subscribe(
      (response) => {
        console.log('Producto agregado:', response);
        this.fetchProducts();
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
      }
    );

    this.inventoryForm.reset();
    this.selectedFiles = [];
    this.submitted = false;
  }

  viewDetails(product: any) {
    this.selectedProduct = product;
  }

  closeCard() {
    this.selectedProduct = null;
  }

  deleteProduct(product: any) {
    // Primero enviar una solicitud DELETE al servidor para eliminar el producto de la base de datos
    this.http.delete(`https://66f616ba436827ced975e4d6.mockapi.io/api/v1/product/${product.id}`).subscribe(
      (response) => {
        console.log('Producto eliminado del servidor:', response);
        
        // Luego, eliminar el producto de la lista temporal
        this.tempProducts = this.tempProducts.filter(p => p.id !== product.id);
      },
      (error) => {
        console.error('Error al eliminar el producto del servidor:', error);
      }
    );
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}










