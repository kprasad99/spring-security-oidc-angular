import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth.guard';
import { AutoLoginComponent } from './auto-login/auto-login.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
},
{
  path: 'autologin',
  component: AutoLoginComponent
},
// {
//   path: 'state',
//   pathMatch: 'full',
//   redirectTo: 'home'
// },
{
  path: 'sso',
  loadChildren: () => import('./sso/sso.module').then(m => m.SsoModule)
},
{
  path: 'home',
  canActivateChild: [AuthGuard],
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'unauthorized',
  component: UnauthorizedComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
//    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
