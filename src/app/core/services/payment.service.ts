import { Injectable } from '@angular/core';
import { Payment } from '../interfaces/payment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/pago';

  constructor(private http: HttpClient) { }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/nuevoPago`, payment);
  }
}
