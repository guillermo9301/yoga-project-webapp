import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  get password() {
    return this.passwordForm.controls.password;
  }

  get confirmPassword() {
    return this.passwordForm.controls.confirmPassword;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
        const newPassword = this.passwordForm.value.password;
        
        if (newPassword) {
            this.authService.updatePassword(newPassword).subscribe({
                next: () => {
                    console.info("Contraseña actualizada con éxito");
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    console.error("Error al actualizar la contraseña", error);
                }
            });
        } else {
            console.error("La nueva contraseña es inválida.");
        }
    } else {
        this.passwordForm.markAllAsTouched();
        alert("Por favor, complete los campos correctamente");
    }
}


}
