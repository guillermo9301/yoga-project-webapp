import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent {

  constructor(private router: Router) { }

  setPrice(price: number) {
    localStorage.setItem('selectedPrice', price.toString());
    this.router.navigate(['/pago']);
  }
}

