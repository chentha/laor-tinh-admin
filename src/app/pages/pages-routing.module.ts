import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { UserListComponent } from './user-role/user-list/user-list.component';
import { RoleListComponent } from './user-role/role-list/role-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { FavoriteComponent } from './product/favorite/favorite.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { ShippingListComponent } from './shipping/shipping-list/shipping-list.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryListComponent,
  },
  {
    path: 'banner',
    component: BannerListComponent,
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
  },
  {
    path: 'shipping',
    component: ShippingListComponent
  }
  ,
  {
    path: 'tracking',
    component: TrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
