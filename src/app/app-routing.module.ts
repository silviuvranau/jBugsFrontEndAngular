import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReadJsonComponent} from './read-json/read-json.component';
import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
     path: 'dashboard',
    component: DashboardComponent,
  //   canActivate:[LoggedInGuard],
    children: [
       {
         path: 'user-list',
         component: UserListComponent}]}
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
