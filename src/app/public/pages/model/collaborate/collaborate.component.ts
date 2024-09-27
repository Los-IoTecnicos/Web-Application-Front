import { Component } from '@angular/core';

interface Colaborador {
  nombre: string;
  email: string;
  celular: string;
}

@Component({
  selector: 'app-collaborate',
  templateUrl: './collaborate.component.html',
  styleUrls: ['./collaborate.component.css']
})
export class CollaborateComponent {

  encargado = {
    nombre: 'Julio Perez',
    email: 'julioP12@gmail.com',
    celular: '985645657'
  };

  // Miembros autorizados
  personalRestaurante: Colaborador[] = [];
  personalMantenimiento: Colaborador[] = [];

  // Control del modal y de la confirmación
  mostrarFormulario = false;
  mostrarConfirmacion = false;

  // Datos del nuevo miembro
  nuevoMiembro = {
    nombre: 'Nuevo Miembro',  // Añadimos el nombre genérico para la simulación
    email: '',
    celular: '987654321',
    rol: ''
  };

  // Función para abrir el formulario
  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  // Función para cerrar el formulario
  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  // Función para enviar la invitación
  enviarInvitacion() {
    // Simulación de enviar la invitación y mostrar el mensaje de confirmación
    this.mostrarConfirmacion = true;

    // Cerrar la ventana emergente
    this.mostrarFormulario = false;

    // Mostrar la alerta por 3 segundos y luego ocultarla
    setTimeout(() => {
      this.mostrarConfirmacion = false;
    }, 3000); // Desaparece después de 3 segundos
    // Simulación de la confirmación desde el correo y agregar el miembro
    if (this.nuevoMiembro.rol === 'restaurante') {
      this.personalRestaurante.push({
        nombre: 'Nuevo Miembro',  // Puedes agregar un campo de nombre si lo deseas
        email: this.nuevoMiembro.email,
        celular: this.nuevoMiembro.celular
      });
    } else if (this.nuevoMiembro.rol === 'mantenimiento') {
      this.personalMantenimiento.push({
        nombre: 'Nuevo Miembro',
        email: this.nuevoMiembro.email,
        celular: this.nuevoMiembro.celular
      });
    }

    // Reiniciar los campos del formulario
    this.nuevoMiembro = { nombre: 'Nuevo Miembro', email: '', celular: '987654321', rol: '' };
  }
}
