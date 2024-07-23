import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn?: boolean
  btnActionUrl?: string
  btnActionText?: string

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe({
      next: (value: boolean) => {
        this.isLoggedIn = value ? true : false
        this.setCallAction()
      }
    })
  }

  setCallAction() {
    if (this.isLoggedIn) {
      this.btnActionText = "Ven y prueba una clase"
      this.btnActionUrl = "/calendario"
    } else {
      this.btnActionText = "Registrate Aquí!"
      this.btnActionUrl = "/auth/signup"
    }
  }


}
