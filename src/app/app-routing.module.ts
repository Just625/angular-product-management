import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {ProductUpdateComponent} from './product/product-update/product-update.component';
import {ProductDeleteComponent} from './product/product-delete/product-delete.component';


const routes: Routes = [
  {
  path: 'products',
  component: ProductListComponent
},
  {
    path: 'products/create',
    component: ProductCreateComponent
  }, {
    path: 'products/edit/:id',
    component: ProductUpdateComponent
  }, {
    path: 'products/delete/:id',
    component: ProductDeleteComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
