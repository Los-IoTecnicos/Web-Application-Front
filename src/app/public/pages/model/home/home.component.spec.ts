import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxImageCompressService } from 'ngx-image-compress';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [NgxImageCompressService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.inventoryForm).toBeDefined();
    expect(component.inventoryForm.controls['title']).toBeDefined();
    expect(component.inventoryForm.controls['description']).toBeDefined();
    expect(component.inventoryForm.controls['capacity']).toBeDefined();
    expect(component.inventoryForm.controls['temperature']).toBeDefined();
    expect(component.inventoryForm.controls['humidity']).toBeDefined();
    expect(component.inventoryForm.controls['lastMaintenance']).toBeDefined();
    expect(component.inventoryForm.controls['nextMaintenance']).toBeDefined();
    expect(component.inventoryForm.controls['model']).toBeDefined();
    expect(component.inventoryForm.controls['serialNumber']).toBeDefined();
    expect(component.inventoryForm.controls['installedDate']).toBeDefined();
  });

  it('should toggle form visibility when showAddForm is called', () => {
    expect(component.isFormVisible).toBeFalse();
    component.toggleAddForm();
    expect(component.isFormVisible).toBeTrue();
    component.toggleAddForm();
    expect(component.isFormVisible).toBeFalse();
  });

  it('should add a new fridge and reset the form', () => {
    const initialLength = component.cards.length;

    component.inventoryForm.setValue({
      title: 'Test Fridge',
      description: 'Description',
      capacity: '100%',
      temperature: '-10°C',
      humidity: '50%',
      lastMaintenance: '2024-10-01',
      nextMaintenance: '2024-12-01',
      model: 'TestModel 2000',
      serialNumber: 'SN123456',
      installedDate: '2024-01-01'
    });

    component.selectedFiles = ['testImage.png'];
    component.addFridge();

    expect(component.cards.length).toBe(initialLength + 1);
    expect(component.inventoryForm.valid).toBeTrue();
    expect(component.isFormVisible).toBeFalse();
  });

  it('should not add a fridge if the form is invalid', () => {
    const initialLength = component.cards.length;

    component.inventoryForm.setValue({
      title: '',
      description: '',
      capacity: '',
      temperature: '',
      humidity: '',
      lastMaintenance: '',
      nextMaintenance: '',
      model: '',
      serialNumber: '',
      installedDate: ''
    });

    component.addFridge();

    expect(component.cards.length).toBe(initialLength);
    expect(component.inventoryForm.invalid).toBeTrue();
    expect(component.isFormVisible).toBeTrue();
  });
});
