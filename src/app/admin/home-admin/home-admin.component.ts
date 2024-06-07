import { Component } from '@angular/core';

const user = {
  nombre: "Guillermo",
  apellido_paterno: "Anticona",
  apellido_materno: "Gadea",
  correo: "guille.anticona@gmail.com"
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html'
})

export class HomeAdminComponent {
  user = user

}
