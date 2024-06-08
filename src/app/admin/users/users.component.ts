import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faSearch = faSearch
  usersList: Usuario[] = []

  constructor(private userService: UserService, private dialog: MatDialog) { }

  getFullName(row: any): string {
    return `${row.apellido_paterno} ${row.apellido_materno}`;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.usersList = data
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching users', error);
      }
    })
  }

  openEditModal(userId: number): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '70%',
      height: '80%',
      data: { id: userId }
    })

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}
