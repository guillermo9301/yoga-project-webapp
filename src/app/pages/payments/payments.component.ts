import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PaqueteService } from 'src/app/core/services/paquete.service';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PaymentRequest } from 'src/app/core/interfaces/payment';
import { SuscriptionService } from 'src/app/core/services/suscription.service';
import { Suscription, SuscriptionDTO } from 'src/app/core/interfaces/SuscriptionDTO';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  paquete!: Paquete;
  userData!: User

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private paqueteService: PaqueteService,
    private paymentService: PaymentService,
    private suscriptionService: SuscriptionService,
    private authService: AuthService
  ) {
    this.paymentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{9}')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^(\\d{4} \\d{4} \\d{4} \\d{4})$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\\/([0-9]{2})')]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      cardHolderName: ['', Validators.required],
      paqueteId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const paqueteId = +params['id'];
      this.paqueteService.getPaquete(paqueteId).subscribe({
        next: (paquete) => {
          this.paquete = paquete;
          if (this.paquete) {
            this.paymentForm.patchValue({
              paqueteId: paquete.id
            });
          }
        },
        error: (err) => {
          console.error('Error fetching paquete', err);
        }
      });
    });

    this.authService.currentUserData.subscribe({
      next: (data) => {
        this.userData = data
      }
    })
  }

  get email() {
    return this.paymentForm.get('email');
  }
  
  get phone() {
    return this.paymentForm.get('phone');
  }
  
  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }
  
  get expiryDate() {
    return this.paymentForm.get('expiryDate');
  }
  
  get cvc() {
    return this.paymentForm.get('cvc');
  }
  
  get cardHolderName() {
    return this.paymentForm.get('cardHolderName');
  }
  

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '').substring(0, 16);
    input = input.replace(/(\d{4})(?=\d)/g, '$1 ');
    event.target.value = input;
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Por favor, completa todos los campos correctamente.`
      });
      return;
    }

    const paymentData: PaymentRequest = {
      correo: this.paymentForm.value.email,
      celular: this.paymentForm.value.phone,
      cvc: this.paymentForm.value.cvc,
      expiracion: this.paymentForm.value.expiryDate,
      numTarjeta: this.paymentForm.value.cardNumber,
      titular: this.paymentForm.value.cardHolderName,
      paqueteId: this.paquete?.id,
      alumnoId: this.userData.id
    };

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: `Se realizó el pago exitosamente`
        }).then(() => {
          this.paymentForm.reset();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Hubo un problema al realizar el pago. Por favor, intenta nuevamente.`
        });
        console.error('Error processing payment', err);
      }
    });
  }
}
