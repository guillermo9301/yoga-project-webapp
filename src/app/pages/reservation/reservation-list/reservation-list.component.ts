import { Component, OnInit } from '@angular/core';
import { TrialClassService } from 'src/app/core/services/trial-class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  trialClass: any;
  
  constructor(private trialClassService: TrialClassService){
    this.listarTrials()
  }
  
  ngOnInit(): void {
    
  }

  listarTrials() {
    this.trialClassService.listar().subscribe({
      next: (data) => {
        this.trialClass = data
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    })
  }

  deleteTrial(id: number) {
    this.trialClassService.deleteTrialClass(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La clase de prueba fue eliminada exitosamente'
        });
        // Actualiza la lista después de eliminar
        this.listarTrials();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error durante la eliminación'
        });
        console.error('Error deleting trial class', error);
      }
    });
  }

}
