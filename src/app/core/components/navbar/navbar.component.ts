import { Component } from '@angular/core';
import { faUser, faComments, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  faUser = faUser
  faComments = faComments
  faRightFromBracket = faRightFromBracket
}
