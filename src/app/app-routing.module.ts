import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoComponent } from './todo/todo.component';
import { AccessGuardService } from './AccessGuard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks/:email',
    component: TodoAddComponent,
    canActivate: [AccessGuardService]
  },
  {
    path: 'tasks/:email/:id',
    component: TodoComponent,
    canActivate: [AccessGuardService]
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
