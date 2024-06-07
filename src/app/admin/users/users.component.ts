import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/users-list';
import { UserService } from 'src/app/core/services/user.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  faSearch = faSearch
  usersList: Usuario[] = []

  constructor(private userService: UserService) { }

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

}
