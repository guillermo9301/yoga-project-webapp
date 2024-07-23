import { Injectable } from '@angular/core';
import { PaymentRequest } from '../interfaces/payment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private collection = 'pago';

  constructor(private http: HttpClient) { }

  createPayment(payment: PaymentRequest): Observable<PaymentRequest> {
    return this.http.post<PaymentRequest>(environment.url + this.collection + "/nuevoPago", payment);
  }
}
