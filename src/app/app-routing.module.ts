import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { EntrypageComponent } from './entrypage/entrypage.component';
import { configuration } from './configuration';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/productlist',
    component: ProductlistComponent,
    canActivate: [AuthGuard]
    // pathMatch: 'full'
    },
    {
      path: 'Loginpage',
      component: LoginpageComponent
    },

    {
      path: 'productlist',
      component: ProductlistComponent
    },
    {
      path: 'entrypage',
      component: EntrypageComponent
    },
    {
      path: 'configuration',
      component: configuration
    },
    {
      path: 'registerpage',
      component: RegisterpageComponent
    },
    // {
    //   path: 'menu',
    //   component: MenuComponent,
    //   children: [],
    // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
