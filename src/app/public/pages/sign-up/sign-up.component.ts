import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm: FormGroup;
  showErrorMessages: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7}$/)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido', this.registerForm.value);
      console.log('Usuario registrado exitosamente');

      this.router.navigate(['/login']);
    } else {
      console.log('Formulario inválido');
      this.registerForm.markAllAsTouched();
      this.showErrorMessages = true;


      setTimeout(() => {
        this.showErrorMessages = false;
      }, 3000);
    }
  }
}
