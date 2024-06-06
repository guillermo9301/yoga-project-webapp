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

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.usersList = data
      }
    })
  }

}
