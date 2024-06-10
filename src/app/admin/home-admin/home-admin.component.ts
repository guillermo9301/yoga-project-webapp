import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html'
})

export class HomeAdminComponent implements OnInit {

  userLoginOn: boolean = false;
  userData?: User
  currentUser: any;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn
      }
    })

    this.authService.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData
      }
    })
  }
}
