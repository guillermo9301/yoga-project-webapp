import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUser, faComments, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    userLoginOn?: boolean
    userData?: User
    currentUser?: any;


    constructor(private authService: AuthService) {
        this.authService.currentUserLoginOn.subscribe({
            next: (userLoginOn) => {
                this.userLoginOn = userLoginOn
                console.log("Login on? desde navbar " + userLoginOn)
            }
        })

        this.authService.currentUserData.subscribe({
            next: (userData) => {
                this.userData = userData
                console.log("Userdata desde el navbar " + userData.nombre)
            }
        })
    }

    logout() {
        this.authService.logout();
        this.currentUser = null;
    }

    faUser = faUser
    faComments = faComments
    faRightFromBracket = faRightFromBracket
}
