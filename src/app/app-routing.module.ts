import { UserprofileComponent } from './userprofile/userprofile.component';
import { DetailsComponent } from './details/details.component';
import { AllskillsComponent } from './allskills/allskills.component';
import { MyskillsComponent } from './myskills/myskills.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddskillsComponent } from './addskills/addskills.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add', component: AddskillsComponent },
  { path: 'myskills', component: MyskillsComponent },
  { path: 'skills', component: AllskillsComponent },
  { path: 'user', component: UserprofileComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
