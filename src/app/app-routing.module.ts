import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserListComponent} from './user-list/user-list.component';
import {RolesComponent} from "./roles/roles.component";
import {UserCreateComponent} from './user-create/user-create.component';
import {BugsComponent} from './bugs/bugs.component';
import {AuthGuardService} from "./guards/auth-guard.service";
import {NotificationListComponent} from './notification/notification-list/notification-list.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate:   [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:   [AuthGuardService],
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
      },
      {
        path: 'bugs',
        component: BugsComponent
      },
      {
        path: 'notifications',
        component: NotificationListComponent
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
