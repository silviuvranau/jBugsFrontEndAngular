import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserListComponent} from './user-list/user-list.component';
import {RolesComponent} from "./roles/roles.component";
import {UserCreateComponent} from './user-create/user-create.component';

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
        component: UserListComponent
      },
      {
        path: 'changePermissions',
        component: RolesComponent
      },
      {
        path: 'add-user',
        component: UserCreateComponent
      }
    ]
  }
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
