import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helper/auth-guard';

const routes: Routes = [{
  path: 'products',
  canActivate: [AuthGuard],
  loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
}, {
  path: 'categories',
  canActivate: [AuthGuard],
  loadChildren: () => import('./category/category.module').then(module => module.CategoryModule)
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
