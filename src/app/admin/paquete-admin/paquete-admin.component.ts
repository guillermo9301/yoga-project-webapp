import { Component, OnInit } from '@angular/core';
import { Paquete } from 'src/app/core/interfaces/paquete';
import { PaqueteService } from 'src/app/core/services/paquete.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

import { EditPaqueteComponent } from './edit-paquete/edit-paquete.component';



@Component({
  selector: 'app-paquete-admin',
  templateUrl: './paquete-admin.component.html',
  styleUrls: ['./paquete-admin.component.css']
})
export class PaqueteAdminComponent implements OnInit {

  paquetes: Paquete[] = [];

  constructor(private paqueteService: PaqueteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPaquetes();
  }



  getPaquetes(): void {
    this.paqueteService.getPaquetes().subscribe(paquetes => {
      this.paquetes = paquetes;
      console.log(this.paquetes);
      console.log(this.paquetes);
    });
  }


  addPaquete(newPaquete: Paquete): void {
    this.paqueteService.createPaquete(newPaquete).subscribe(paquete => this.paquetes.push(paquete));
  }

  updatePaquete(id: number, updatedPaquete: Paquete): void {
    this.paqueteService.updatePaquete(id, updatedPaquete).subscribe(paquete => {
      const index = this.paquetes.findIndex(p => p.id === id);
      if (index !== -1) {
        this.paquetes[index] = paquete;
      }
    });
  }
  /*
   deletePaquete(id: number): void {
     this.paqueteService.deletePaquete(id).subscribe(() => {
       this.paquetes = this.paquetes.filter(p => p.id !== id);
     });
   }
 
   eliminarPaquete(id: number): void {
     Swal.fire({
       icon: 'question',
       title: 'Eliminar paquete',
       text: '¿Estás seguro de que deseas eliminar este paquete?',
       showCancelButton: true,
       confirmButtonText: 'Sí',
       cancelButtonText: 'Cancelar',
       cancelButtonColor: '#d33'
     }).then((result) => {
       if (result.isConfirmed) {
         this.deletePaquete(id);
       }
     });
   }*/

  openEditModal(paqueteId: number): void {
    const dialogRef = this.dialog.open(EditPaqueteComponent, {
      width: '70%',
      height: '80%',
      data: { id: paqueteId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.paquetes.findIndex(p => p.id === paqueteId);
        if (index !== -1) {
          this.paquetes[index] = result;
        }
      }
    });
  }

}
