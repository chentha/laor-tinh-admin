import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { UserListComponent } from './user-role/user-list/user-list.component';
import { RoleListComponent } from './user-role/role-list/role-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { FavoriteComponent } from './product/favorite/favorite.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryListComponent
  },
  {
    path: 'product',
    component: ProductListComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'payment',
    component: PaymentListComponent
  },
  {
    path: 'order',
    component: OrderListComponent
  },
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'role',
    component: RoleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
