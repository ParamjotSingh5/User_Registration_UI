import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model" ;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Users : User[];
  
  constructor( private fb:FormBuilder, private http :HttpClient) { } 

  readonly BaseURI = "http://localhost:60998/api";

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password : ['',[ Validators.required, Validators.minLength(4)]],
      ConfirmPassword :['', Validators.required]
    },{validator : this.comparePasswords})    
  });

  editUser = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : ['']    
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMismatch : true});
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }

  }

  refreshList(){
    this.http.get(this.BaseURI +'/ApplicationUser')
    .toPromise()
    .then(res => this.Users = res as User[]);
  }

  deleteUser(user : User){
    return this.http.delete(this.BaseURI +'/ApplicationUser/'+user.UserName);   
  }

  edit(){
    var body ={
      UserName : this.editUser.value.UserName,
      Email : this.editUser.value.Email,
      FullName : this.editUser.value.FullName,
      Password : this.editUser.value.Passwords.Password
    };
  }

  register(){
    var body ={
      UserName : this.formModel.value.UserName,
      Email : this.formModel.value.Email,
      FullName : this.formModel.value.FullName,
      Password : this.formModel.value.Passwords.Password
    };

    return this.http.post(this.BaseURI + "/ApplicationUser/Register", body);
  }
}
