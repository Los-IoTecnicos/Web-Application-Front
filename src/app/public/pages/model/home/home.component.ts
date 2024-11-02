import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inventoryForm: FormGroup;
  cards: any[] = [];  // Almacena las cards actuales
  selectedFiles: string[] = [];
  submitted = false;
  isFormVisible = false; // El formulario está oculto por defecto
  apiUrl = 'http://localhost:3000/equipment'; // Cambié la URL de la API según tu solicitud

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private imageCompress: NgxImageCompressService) {
    // Inicializar el formulario con validaciones requeridas
    this.inventoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      temperature: ['', Validators.required],
      humidity: ['', Validators.required],
      lastMaintenance: ['', Validators.required],
      nextMaintenance: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      installedDate: ['', Validators.required]
    });

    // Obtener equipos desde la API al cargar el componente
    this.loadCardsFromApi();
  }

  // Método para obtener las cards desde la API
  loadCardsFromApi() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.cards = data; // Asigna los equipos obtenidos desde la API
        } else {
          this.initializeDefaultCards(); // Si no hay datos, inicializar con las predeterminadas
        }
      },
      (error) => {
        console.error('Error al cargar los equipos:', error);
        this.initializeDefaultCards(); // Si hay error, inicializar con las predeterminadas
      }
    );
  }

  // Inicializar tarjetas predeterminadas si la API falla o no tiene datos
  initializeDefaultCards() {
    this.cards = [
      {
        image: 'https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png',
        title: 'Refrigerator A1',
        description: 'Active',
        capacity: 'Capacity: 80%',
        temperature: '-18°C',
        humidity: '65%',
        lastMaintenance: '2024-08-15',
        nextMaintenance: '2024-12-15',
        model: 'CoolMax 3000',
        serialNumber: 'CM3K-12345',
        installedDate: '2023-01-10'
      },
      {
        image: 'https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png',
        title: 'Refrigerator EA2',
        description: 'Under maintenance',
        capacity: 'Capacity: 0%',
        temperature: '-15°C',
        humidity: '70%',
        lastMaintenance: '2024-07-10',
        nextMaintenance: '2024-11-10',
        model: 'CoolMax 2000',
        serialNumber: 'CM2K-67890',
        installedDate: '2023-02-15'
      },
      {
        image: 'https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png',
        title: 'Refrigerator EA3',
        description: 'Active',
        capacity: 'Capacity: 50%',
        temperature: '-19°C',
        humidity: '60%',
        lastMaintenance: '2024-06-10',
        nextMaintenance: '2024-12-10',
        model: 'CoolMax 1000',
        serialNumber: 'CM1K-45678',
        installedDate: '2022-11-20'
      },
      {
        image: 'https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png',
        title: 'Refrigerator EA6',
        description: 'Active',
        capacity: 'Capacity: 50%',
        temperature: '-20°C',
        humidity: '55%',
        lastMaintenance: '2024-05-15',
        nextMaintenance: '2024-11-15',
        model: 'CoolMax 4000',
        serialNumber: 'CM4K-98765',
        installedDate: '2022-12-25'
      }
    ];
  }
  deleteFridge(id: number) {
    // Realizar la solicitud DELETE a la API
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        console.log('Equipment deleted successfully');
        // Filtrar el equipo eliminado de la lista local
        this.cards = this.cards.filter(card => card.id !== id);
      },
      (error) => {
        console.error('Error deleting equipment:', error);
        alert('Error deleting equipment. Please check the API connection.');
      }
    );
  }

  // Método para alternar la visibilidad del formulario
  toggleAddForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result;

        // Comprimir la imagen antes de almacenarla
        this.imageCompress.compressFile(imageBase64, -1, 50, 50).then(
          compressedImage => {
            this.selectedFiles = [compressedImage]; // Guardar la imagen comprimida
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  // Añadir un nuevo equipo de refrigeración
  addFridge() {
    this.submitted = true;

    // Verificar si el formulario es inválido
    if (this.inventoryForm.invalid) {
      alert("Please complete all required fields.");
      return;
    }

    const newFridge = {
      ...this.inventoryForm.value,
      image: this.selectedFiles.length > 0 ? this.selectedFiles[0] : 'https://cdn.discordapp.com/attachments/1273824394451615826/1288777187243200542/image_refrigerator.png' // Valor predeterminado si no se selecciona una imagen
    };

    // Enviar el nuevo equipo a la API para almacenarlo
    this.http.post(this.apiUrl, newFridge).subscribe(
      (response) => {
        console.log('Equipment added:', response);
        this.cards.push(newFridge); // Agregar el equipo a la lista local
        this.resetForm();
        this.isFormVisible = false; // Ocultar el formulario después de agregar el equipo
      },
      (error) => {
        console.error('Error adding equipment:', error);
        alert('Error adding equipment. Please check the API connection.');
      }
    );
  }

  resetForm() {
    this.inventoryForm.reset();
    this.selectedFiles = [];
    this.submitted = false;
  }
}
