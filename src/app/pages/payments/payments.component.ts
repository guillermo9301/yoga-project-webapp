import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentForm: any;
  price: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const priceString = localStorage.getItem('selectedPrice');
    if (priceString) {
      this.price = parseInt(priceString, 10);
    }

    this.paymentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{9}')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^(\\d{4} \\d{4} \\d{4} \\d{4})$')]], // Ajuste en el patrón
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\\/([0-9]{2})')]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      cardHolderName: ['', Validators.required]
    });
  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '').substring(0, 16); // Elimina caracteres no numéricos y limita a 16 dígitos
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

    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: `Se realizó el pago exitosamente`
    }).then(() => {
      this.paymentForm.reset();
    });
  }
}
