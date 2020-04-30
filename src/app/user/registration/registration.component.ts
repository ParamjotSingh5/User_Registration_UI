import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service : UserService, private toastr : ToastrService) { }

  ngOnInit() {
  }


  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New User Created!','Registration successful');
        }
        else{          
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error(element.description,'Registration failed');
                // UserName is already taken
                break;

              default : 
              // Registration failed
              break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
