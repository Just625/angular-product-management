import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [{
  path: 'products',
  loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
}, {
  path: 'categories',
  loadChildren: () => import('./category/category.module').then(module => module.CategoryModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
