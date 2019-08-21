import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate:[LoggedInGuard],
  //   children: [
  //     {
  //       path:'users',
  //       children: [
  //         {
  //           path: '',
  //           component: UsersComponent
  //         },
  //         {
  //           path:':userId',
  //           children:[
  //             {
  //               path:'edit',
  //               component: UserEditComponent
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path:'bugs',
  //       component: BugsComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
