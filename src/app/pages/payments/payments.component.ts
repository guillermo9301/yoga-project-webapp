import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PaqueteService } from 'src/app/core/services/paquete.service';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { PaymentService } from 'src/app/core/services/payment.service';
import { Payment } from 'src/app/core/interfaces/payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm: FormGroup;
  paquete: Paquete | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private paqueteService: PaqueteService,
    private paymentService: PaymentService
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

    const paymentData: Payment = {
      id: 0,
      celular: this.paymentForm.value.phone,
      correo: this.paymentForm.value.email,
      cvc: this.paymentForm.value.cvc,
      expiracion: this.paymentForm.value.expiryDate,
      numTarjeta: this.paymentForm.value.cardNumber,
      titular: this.paymentForm.value.cardHolderName,
      paquete: {
        id: this.paquete?.id ?? 0,
        nombre: this.paquete?.nombre ?? '',
        precio: this.paquete?.precio ?? 0,
        cantidadClases: this.paquete?.cantidadClases ?? 0,
        cantidadDias: this.paquete?.cantidadDias ?? 0
      }
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
