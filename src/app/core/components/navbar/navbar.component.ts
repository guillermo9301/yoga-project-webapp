import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUser, faComments, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
    userLoginOn: boolean = false;
    userData?: User
    currentUser: any;


    constructor(private authService: AuthService) { }

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

    ngOnDestroy(): void {
        this.authService.currentUserData.unsubscribe()
        this.authService.currentUserLoginOn.unsubscribe()
    }



    logout() {
        this.authService.logout();
        this.currentUser = null;
        //window.location.reload()
    }

    faUser = faUser
    faComments = faComments
    faRightFromBracket = faRightFromBracket
}
