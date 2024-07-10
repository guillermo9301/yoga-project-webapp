import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  recoverForm: FormGroup;

  faEnvelope = faEnvelope
    faLock = faLock

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  get correo() {
    return this.recoverForm.get('correo')!;
  }

  recoverPassword() {
    if (this.recoverForm.valid) {
      const email = this.recoverForm.value.correo;
      // Lógica para recuperar la contraseña utilizando el correo electrónico
      console.log('Correo para recuperar contraseña:', email);
    } else {
      console.log('El formulario es inválido');
    }
  }
}
