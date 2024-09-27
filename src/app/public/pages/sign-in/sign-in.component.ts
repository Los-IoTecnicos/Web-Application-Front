import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  submitted = false;
  showPopup = false;
  errorMessage = '';
  showPassword = false;

  // Credenciales predeterminadas
  private readonly fakeEmail = 'fostchef@empresa.com';
  private readonly fakePassword = '123456';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Si el formulario es inválido, mostramos el popup de error
    if (this.loginForm.invalid) {
      this.showPopupMessage();
      return;
    }


    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email === this.fakeEmail && password === this.fakePassword) {

      this.router.navigate(['/home']);
    } else {

      this.errorMessage = 'Credenciales incorrectas';
      this.showPopupMessage();
    }
  }

  showPopupMessage() {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
