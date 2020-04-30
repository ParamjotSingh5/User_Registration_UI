import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  constructor(private service:UserService, private router: Router) { }

  ngOnInit() {
    this.service.refreshList();
  }

  deleteUser(user : User){
    this.service.deleteUser(user).subscribe(
      res => {
        this.service.refreshList();
      },
      err =>{
        console.log(err);
      }
    )
  }

  editUser(user : User){
    this.service.editUser.setValue({
      UserName : user.UserName,
      Email : user.Email,
      FullName : user.FullName
    });
    this.router.navigate(['/edit']);
  }
  
}
