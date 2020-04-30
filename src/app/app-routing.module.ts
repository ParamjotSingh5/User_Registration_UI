import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { EditComponent } from './user/edit/edit.component'
import { User } from './shared/user.model'

const routes: Routes = [
  {
    path:'', redirectTo:'/user/registration', pathMatch:'full'
  }, // defualt path. if path is empty, control will redirectTo to defind 
  
  {
    path:'user',component:UserComponent,
    children:[
      {
        path:'registration' ,component:RegistrationComponent
      } //in order to access registration component we need make a request /user/registration 
    ]
  },

  {
    path:'registration',component:RegistrationComponent    
  },

  {
    path:'edit',component:EditComponent, data:User
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
