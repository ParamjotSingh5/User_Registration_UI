import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
  _user : User;

  constructor(private service:UserService) { }

  ngOnInit() {    
  
  }

  onSubmit(){
    
  }  

}
