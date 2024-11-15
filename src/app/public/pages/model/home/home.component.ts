import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  inventoryForm: FormGroup;
  cards: any[] = []; // Stores current cards
  selectedFiles: string[] = []; // For image upload
  submitted = false; // Controls if the form is submitted
  isFormVisible = false; // Controls the visibility of the form
  apiUrl = 'http://localhost:3000/equipment'; // API URL
  nextMaintenanceMinDate: string = ''; // Minimum date allowed for next maintenance
  overdueAlert: string | null = null; // Alert message for overdue maintenance

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService,
    private router: Router
  ) {
    // Initialize form with validations
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
      installedDate: ['', Validators.required],
    });

    // Load cards from the API
    this.loadCardsFromApi();
  }

  // Navigate to the details view
  viewDetails(card: any) {
    this.checkMaintenanceAlert(card); // Check if maintenance is overdue
    localStorage.setItem('selectedFridgeTitle', card.title); // Save the title in localStorage
    this.router.navigate(['/details'], { queryParams: { id: card.id } }); // Redirect to the details page
  }

  // Check if maintenance is overdue and set the alert message
  checkMaintenanceAlert(card: any): void {
    const today = new Date().toISOString().split('T')[0];
    if (card.nextMaintenance && card.nextMaintenance < today) {
      this.overdueAlert = `Maintenance is overdue for ${card.title}. Please schedule it immediately.`;
    } else {
      this.overdueAlert = null;
    }
  }

  // Change the text color dynamically based on the description
  getTextColor(description: string): string {
    return description === 'Active' ? 'green' : 'red';
  }

  // Load cards from the API
  loadCardsFromApi() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.cards = data || []; // Assign data to the cards array
      },
      (error) => {
        console.error('Error loading equipment:', error);
        this.initializeDefaultCards(); // Load default cards on error
      }
    );
  }

  // Initialize default cards
  initializeDefaultCards() {
    this.cards = [
      {
        id: 1,
        image: 'https://via.placeholder.com/300x180?text=No+Image',
        title: 'Refrigerator A1',
        description: 'Active',
        capacity: 'Capacity: 80%',
        temperature: '-18°C',
        humidity: '65%',
        lastMaintenance: '2024-08-15',
        nextMaintenance: '2024-12-15',
        model: 'CoolMax 3000',
        serialNumber: 'CM3K-12345',
        installedDate: '2023-01-10',
      },
    ];
  }

  // Delete a specific card
  deleteFridge(id: number) {
    console.log(`Attempting to delete equipment with ID: ${id}`);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.cards = this.cards.filter((card) => card.id !== id); // Remove the card locally
      },
      (error) => console.error('Error deleting equipment:', error)
    );
  }

  // Toggle the visibility of the add form
  toggleAddForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  // Handle image upload
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageCompress.compressFile(e.target.result, -1, 50, 50).then((compressedImage) => {
          this.selectedFiles = [compressedImage]; // Save the compressed image
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Add a new refrigeration equipment
  addFridge() {
    this.submitted = true;

    // Check if the form is invalid
    if (this.inventoryForm.invalid) {
      return;
    }

    const newFridge = {
      ...this.inventoryForm.value,
      image: this.selectedFiles[0] || 'https://via.placeholder.com/300x180?text=No+Image',
    };

    this.http.post(this.apiUrl, newFridge).subscribe(
      (response: any) => {
        this.cards.push(response); // Add the card to the local array
        this.resetForm(); // Reset the form
        this.isFormVisible = false; // Hide the form
      },
      (error) => console.error('Error adding equipment:', error)
    );
  }

  // Reset the form after adding equipment
  resetForm() {
    this.inventoryForm.reset();
    this.selectedFiles = [];
    this.submitted = false;
  }

  // Update the minimum date for the next maintenance
  onLastMaintenanceChange(): void {
    const lastMaintenanceDate = this.inventoryForm.get('lastMaintenance')?.value;
    if (lastMaintenanceDate) {
      this.nextMaintenanceMinDate = lastMaintenanceDate;
      this.inventoryForm.get('nextMaintenance')?.updateValueAndValidity();
    }
  }
}
