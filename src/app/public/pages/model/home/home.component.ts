import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  inventoryForm: FormGroup;
  cards: any[] = []; // Stores current cards
  selectedFiles: string[] = []; // For image upload
  submitted = false;
  isFormVisible = false; // Form visibility toggle
  apiUrl = 'http://localhost:3000/equipment'; // API URL for equipment

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService,
    private router: Router
  ) {
    // Initialize form with required validations
    this.inventoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]],
      humidity: ['', Validators.required],
      lastMaintenance: ['', Validators.required],
      nextMaintenance: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      installedDate: ['', Validators.required]
    });

    // Load cards from API on component load
    this.loadCardsFromApi();
  }

  // Function to view details of a specific card
  viewDetails(card: any) {
    // Save the title of the selected card in local storage
    localStorage.setItem('selectedFridgeTitle', card.title);
    console.log(localStorage.getItem('selectedFridgeTitle')); // Verify storage
    // Navigate to the details component
    this.router.navigate(['/details'], { queryParams: { id: card.id } });
  }

  // Function to dynamically set text color based on description
  getTextColor(description: string): string {
    return description === 'Active' ? 'green' : 'red';
  }

  // Method to load cards from the API
  loadCardsFromApi() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.cards = data; // Assign cards fetched from the API
        } else {
          this.initializeDefaultCards(); // Initialize with default cards if API returns no data
        }
      },
      (error) => {
        console.error('Error loading equipment:', error);
        this.initializeDefaultCards(); // Initialize with default cards on error
      }
    );
  }

  // Initialize default cards if API fails or returns no data
  initializeDefaultCards() {
    this.cards = [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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

  // Method to delete a specific fridge
  deleteFridge(id: number) {
    console.log(`Attempting to delete equipment with ID: ${id} from ${this.apiUrl}/${id}`);
    
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        console.log('Equipment deleted successfully');
        this.cards = this.cards.filter(card => card.id !== id);
      },
      (error) => {
        console.error('Error deleting equipment:', error);
        alert('Error deleting equipment. Please check the API connection.');
      }
    );
  }
  
  

  // Toggle the visibility of the add equipment form
  toggleAddForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // Handle file selection for image upload
  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBase64 = e.target.result;

        // Compress the image before storing it
        this.imageCompress.compressFile(imageBase64, -1, 50, 50).then(
          compressedImage => {
            this.selectedFiles = [compressedImage]; // Save the compressed image
          }
        );
      };
      reader.readAsDataURL(file);
    }
  }

  // Add a new refrigeration equipment
  addFridge() {
    this.submitted = true;
  
    if (this.inventoryForm.invalid) {
      alert("Please complete all required fields.");
      return;
    }
  
    const newFridge = {
      ...this.inventoryForm.value,
      image: this.selectedFiles.length > 0 ? this.selectedFiles[0] : 'https://via.placeholder.com/300x180?text=No+Image'
    };
  
    this.http.post(this.apiUrl, newFridge).subscribe(
      (response: any) => {
        console.log('Equipment added:', response);
        this.cards.push(response); // El servidor retorna el objeto con el ID generado
        this.resetForm();
        this.isFormVisible = false;
      },
      (error) => {
        console.error('Error adding equipment:', error);
        alert('Error adding equipment. Please check the API connection.');
      }
    );
  }
  
  

  // Reset the form after adding equipment
  resetForm() {
    this.inventoryForm.reset();
    this.selectedFiles = [];
    this.submitted = false;
  }
}

