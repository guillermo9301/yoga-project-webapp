import { Component, OnInit } from '@angular/core';
import { TrialClassService } from 'src/app/core/services/trial-class.service';

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

}
