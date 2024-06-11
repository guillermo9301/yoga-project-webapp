import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  day: string = '';
  startTime: string = '';
  endTime: string = '';
  userLoginOn?: boolean;
  userData?: User;
  reservationForm: any;

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
    });

    this.authService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.authService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        this.setPlaceholders();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.day = params['day'] || '';
      this.startTime = params['start'] || '';
      this.endTime = params['end'] || '';
    });
  }

  private setPlaceholders(): void {
    if (this.userData) {
      this.reservationForm.controls['nombre'].setValue(this.userData.nombre);
      this.reservationForm.controls['correo'].setValue(this.userData.correo);
      this.reservationForm.controls['apellido_paterno'].setValue(this.userData.apellido_paterno);
      this.reservationForm.controls['apellido_materno'].setValue(this.userData.apellido_materno);
    }
  }
}
