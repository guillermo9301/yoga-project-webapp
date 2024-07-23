import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  faSearch = faSearch
  usersList: Usuario[] = []

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.userLoginOn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadUsers()
      } else {
        console.error("Usuario no autenticado")
      }
    })
  }

  loadUsers() {
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
      this.loadUsers();
    })
  }

}
