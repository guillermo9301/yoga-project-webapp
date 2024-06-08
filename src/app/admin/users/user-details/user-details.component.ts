import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: Usuario | undefined


  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.data.id).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
